import React from "react";
import { createPortal } from "react-dom";

const DEFAULT_PORTAL_ID = "lorewave-portal-root";
const PORTAL_MANAGED_ATTR = "data-lorewave-portal-managed";
const PORTAL_REF_COUNT_ATTR = "data-lorewave-portal-refs";

interface PortalTargetResult {
  node: HTMLElement;
  managed: boolean;
}

export interface PortalProps {
  children: React.ReactNode;
  target?: HTMLElement | string;
  withinPortal?: boolean;
  reuseTargetNode?: boolean;
  id?: string;
}

const getRefCount = (node: HTMLElement): number => {
  const count = Number(node.getAttribute(PORTAL_REF_COUNT_ATTR) ?? "0");
  return Number.isNaN(count) ? 0 : count;
};

const setRefCount = (node: HTMLElement, count: number): void => {
  node.setAttribute(PORTAL_REF_COUNT_ATTR, String(Math.max(0, count)));
};

const createManagedNode = (id?: string): HTMLElement => {
  const node = document.createElement("div");
  if (id) {
    node.id = id;
  }

  node.setAttribute(PORTAL_MANAGED_ATTR, "true");
  node.setAttribute(PORTAL_REF_COUNT_ATTR, "0");
  document.body.appendChild(node);
  return node;
};

const resolveTargetNode = (
  target: PortalProps["target"],
  reuseTargetNode: boolean,
  id?: string,
): PortalTargetResult => {
  if (target instanceof HTMLElement) {
    return { node: target, managed: false };
  }

  if (typeof target === "string") {
    try {
      const queriedNode = document.querySelector<HTMLElement>(target);
      if (queriedNode) {
        return {
          node: queriedNode,
          managed: queriedNode.getAttribute(PORTAL_MANAGED_ATTR) === "true",
        };
      }
    } catch {
      // Invalid selector should not break rendering; fallback node will be created.
    }
  }

  if (reuseTargetNode) {
    const reuseId = id ?? DEFAULT_PORTAL_ID;
    const reusedNode = document.getElementById(reuseId);

    if (reusedNode) {
      return {
        node: reusedNode,
        managed: reusedNode.getAttribute(PORTAL_MANAGED_ATTR) === "true",
      };
    }

    return {
      node: createManagedNode(reuseId),
      managed: true,
    };
  }

  return {
    node: createManagedNode(id),
    managed: true,
  };
};

export const Portal = (props: PortalProps) => {
  const {
    children,
    target,
    withinPortal = true,
    reuseTargetNode = false,
    id,
  } = props;

  const [targetNode, setTargetNode] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!withinPortal || typeof document === "undefined") {
      setTargetNode(null);
      return;
    }

    const resolved = resolveTargetNode(target, reuseTargetNode, id);
    setTargetNode(resolved.node);

    if (resolved.managed) {
      setRefCount(resolved.node, getRefCount(resolved.node) + 1);
    }

    return () => {
      if (!resolved.managed) {
        return;
      }

      const nextCount = getRefCount(resolved.node) - 1;
      setRefCount(resolved.node, nextCount);

      if (nextCount <= 0 && resolved.node.parentNode) {
        resolved.node.parentNode.removeChild(resolved.node);
      }
    };
  }, [id, reuseTargetNode, target, withinPortal]);

  if (!withinPortal) {
    return <>{children}</>;
  }

  if (typeof document === "undefined" || targetNode === null) {
    return null;
  }

  return createPortal(children, targetNode);
};