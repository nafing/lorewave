import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const coreRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(coreRoot, "..", "..");
const docsOutputPath = path.resolve(repoRoot, "docs", "core", "api.md");

const COMPONENTS = [
  {
    name: "Box",
    source: "src/components/Box/Box.tsx",
    propsInterface: "CProps",
    coreComputeConst: "Box",
  },
  {
    name: "Paper",
    source: "src/components/Paper/Paper.tsx",
    propsInterface: "CProps",
    coreComputeConst: "Paper",
  },
  {
    name: "Group",
    source: "src/components/Group/Group.tsx",
    propsInterface: "CProps",
    coreComputeConst: "Group",
  },
  {
    name: "Stack",
    source: "src/components/Stack/Stack.tsx",
    propsInterface: "CProps",
    coreComputeConst: "Stack",
  },
  {
    name: "Grid",
    source: "src/components/Grid/Grid.tsx",
    propsInterface: "GridProps",
    coreComputeConst: "GridRoot",
  },
  {
    name: "Grid.Col",
    source: "src/components/Grid/Grid.tsx",
    propsInterface: "GridColProps",
    coreComputeConst: "GridCol",
  },
  {
    name: "Button",
    source: "src/components/Button/Button.tsx",
    propsInterface: "CProps",
    coreComputeConst: "ButtonRoot",
  },
  {
    name: "Button.Group",
    source: "src/components/Button/ButtonGroup.tsx",
    propsInterface: "CProps",
    coreComputeConst: "ButtonGroup",
  },
  {
    name: "ActionIcon",
    source: "src/components/ActionIcon/ActionIcon.tsx",
    propsInterface: "CProps",
    coreComputeConst: "ActionIconRoot",
  },
  {
    name: "ActionIcon.Group",
    source: "src/components/ActionIcon/ActionIconGroup.tsx",
    propsInterface: "CProps",
    coreComputeConst: "ActionIconGroup",
  },
  {
    name: "TextInput",
    source: "src/components/TextInput/TextInput.tsx",
    propsInterface: "CProps",
    coreComputeConst: "TextInput",
  },
  {
    name: "NumberInput",
    source: "src/components/NumberInput/NumberInput.tsx",
    propsInterface: "CProps",
    coreComputeConst: "NumberInput",
  },
  {
    name: "Select",
    source: "src/components/Select/Select.tsx",
    propsInterface: "CProps",
    coreComputeConst: "Select",
  },
  {
    name: "Text",
    source: "src/components/Text/Text.tsx",
    propsInterface: "CProps",
    coreComputeConst: "Text",
  },
  {
    name: "Code",
    source: "src/components/Code/Code.tsx",
    propsInterface: "CProps",
    coreComputeConst: "Code",
  },
  {
    name: "Title",
    source: "src/components/Title/Title.tsx",
    propsInterface: "CProps",
    coreComputeConst: "Title",
  },
];

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function parseSourceFile(filePath, code) {
  return ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

function findInterface(sourceFile, name) {
  for (const stmt of sourceFile.statements) {
    if (ts.isInterfaceDeclaration(stmt) && stmt.name.text === name) {
      return stmt;
    }
  }

  return undefined;
}

function collectTypeAliases(sourceFile) {
  const aliases = new Map();

  for (const stmt of sourceFile.statements) {
    if (ts.isTypeAliasDeclaration(stmt)) {
      aliases.set(stmt.name.text, stmt.type.getText(sourceFile));
    }
  }

  return aliases;
}

function getHeritageText(interfaceDecl, sourceFile) {
  if (!interfaceDecl.heritageClauses) {
    return [];
  }

  const values = [];

  for (const clause of interfaceDecl.heritageClauses) {
    for (const typeNode of clause.types) {
      values.push(normalizeWhitespace(typeNode.getText(sourceFile)));
    }
  }

  return values;
}

function extractProps(interfaceDecl, sourceFile, aliases) {
  const props = [];

  for (const member of interfaceDecl.members) {
    if (!ts.isPropertySignature(member) || !member.name) {
      continue;
    }

    const propName = member.name.getText(sourceFile).replace(/^['\"]|['\"]$/g, "");
    let typeText = member.type ? member.type.getText(sourceFile) : "unknown";

    if (aliases.has(typeText)) {
      typeText = `${typeText} = ${aliases.get(typeText)}`;
    }

    typeText = normalizeWhitespace(typeText);

    props.push({
      name: propName,
      optional: !!member.questionToken,
      type: typeText.replace(/\|/g, "\\|"),
    });
  }

  return props;
}

function getObjectPropertyByName(objectNode, name) {
  for (const prop of objectNode.properties) {
    if (!ts.isPropertyAssignment(prop)) {
      continue;
    }

    const propName = prop.name.getText(objectNode.getSourceFile()).replace(/^['\"]|['\"]$/g, "");
    if (propName === name) {
      return prop;
    }
  }

  return undefined;
}

function findCoreComputeOptions(sourceFile, constName) {
  for (const stmt of sourceFile.statements) {
    if (!ts.isVariableStatement(stmt)) {
      continue;
    }

    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || decl.name.text !== constName) {
        continue;
      }

      if (!decl.initializer || !ts.isCallExpression(decl.initializer)) {
        continue;
      }

      const callExpr = decl.initializer;
      const exprText = callExpr.expression.getText(sourceFile);
      if (!exprText.startsWith("coreCompute")) {
        continue;
      }

      const firstArg = callExpr.arguments[0];
      if (!firstArg || !ts.isObjectLiteralExpression(firstArg)) {
        return undefined;
      }

      return firstArg;
    }
  }

  return undefined;
}

function extractDefaults(optionsObj, sourceFile) {
  const defaults = new Map();
  if (!optionsObj) {
    return defaults;
  }

  const defaultPropsProperty = getObjectPropertyByName(optionsObj, "defaultProps");
  if (!defaultPropsProperty) {
    return defaults;
  }

  if (!ts.isObjectLiteralExpression(defaultPropsProperty.initializer)) {
    return defaults;
  }

  for (const prop of defaultPropsProperty.initializer.properties) {
    if (!ts.isPropertyAssignment(prop)) {
      continue;
    }

    const name = prop.name.getText(sourceFile).replace(/^['\"]|['\"]$/g, "");
    defaults.set(name, prop.initializer.getText(sourceFile));
  }

  return defaults;
}

function extractOmitHtmlProps(optionsObj, sourceFile) {
  if (!optionsObj) {
    return [];
  }

  const omitProperty = getObjectPropertyByName(optionsObj, "omitHTMLProps");
  if (!omitProperty) {
    return [];
  }

  if (!ts.isArrayLiteralExpression(omitProperty.initializer)) {
    return [];
  }

  return omitProperty.initializer.elements.map((el) => el.getText(sourceFile).replace(/^['\"]|['\"]$/g, ""));
}

function toRelativeFromRepo(filePath) {
  return path.relative(repoRoot, filePath).replaceAll(path.sep, "/");
}

function renderPropsTable(props, defaults) {
  if (props.length === 0) {
    return ["No explicit props were found.", ""];
  }

  const lines = [];
  lines.push("| Prop | Type | Default |");
  lines.push("| --- | --- | --- |");

  for (const prop of props) {
    const displayName = prop.optional ? `${prop.name}?` : prop.name;
    const defaultValue = defaults.has(prop.name) ? `\`${defaults.get(prop.name)}\`` : "-";
    lines.push(`| \`${displayName}\` | \`${prop.type}\` | ${defaultValue} |`);
  }

  lines.push("");
  return lines;
}

async function build() {
  const lines = [];

  lines.push("<!-- AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. -->");
  lines.push("<!-- Run: pnpm -C packages/core docs:api -->");
  lines.push("");
  lines.push("# Core API (Generated)");
  lines.push("");
  lines.push("This page is generated from component source files in packages/core/src/components.");
  lines.push("");

  for (const component of COMPONENTS) {
    const absPath = path.resolve(coreRoot, component.source);
    const code = await fs.readFile(absPath, "utf8");
    const sourceFile = parseSourceFile(absPath, code);

    const interfaceDecl = findInterface(sourceFile, component.propsInterface);
    if (!interfaceDecl) {
      throw new Error(`Interface ${component.propsInterface} not found in ${component.source}`);
    }

    const aliases = collectTypeAliases(sourceFile);
    const heritage = getHeritageText(interfaceDecl, sourceFile);
    const props = extractProps(interfaceDecl, sourceFile, aliases);

    const optionsObj = findCoreComputeOptions(sourceFile, component.coreComputeConst);
    const defaults = extractDefaults(optionsObj, sourceFile);
    const omitHtmlProps = extractOmitHtmlProps(optionsObj, sourceFile);

    lines.push(`## ${component.name}`);
    lines.push("");
    lines.push(`- Source: \`${toRelativeFromRepo(absPath)}\``);

    if (heritage.length > 0) {
      lines.push(`- Extends: \`${heritage.join("; ")}\``);
    }

    if (omitHtmlProps.length > 0) {
      lines.push(`- Omit native HTML props: \`${omitHtmlProps.join(", ")}\``);
    }

    lines.push("");
    lines.push(...renderPropsTable(props, defaults));
  }

  lines.push("## Notes");
  lines.push("");
  lines.push("- This page documents explicit component prop interfaces from source files.");
  lines.push("- Inherited native props (from React HTML attribute interfaces) are summarized via the Extends line.");
  lines.push("- Additional style props come from CoreStyleProps via coreCompute and are documented in style-props.md.");
  lines.push("");

  await fs.mkdir(path.dirname(docsOutputPath), { recursive: true });
  await fs.writeFile(docsOutputPath, `${lines.join("\n")}\n`, "utf8");
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
