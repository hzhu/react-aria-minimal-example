import { useTabListState } from "react-stately";
import React, { useEffect, useRef, useState } from "react";
import {
  useTab,
  useTabList,
  useTabPanel,
  useFocusRing,
  mergeProps
} from "react-aria";
import type { TabListStateOptions, TabListState } from "@react-stately/tabs";
import type { Node } from "@react-types/shared";

export function Tabs(props: TabListStateOptions<object>) {
  let state = useTabListState(props);
  let ref = useRef<HTMLDivElement>(null);
  let { tabListProps } = useTabList(props, state, ref);

  let [activeTabStyle, setActiveTabStyle] = useState({
    width: 0,
    transform: "translateX(0)"
  });

  useEffect(() => {
    let activeTab = ref.current?.querySelector<HTMLElement>(
      '[role="tab"][aria-selected="true"]'
    );
    if (activeTab?.offsetWidth) {
      setActiveTabStyle({
        width: activeTab?.offsetWidth,
        transform: `translateX(${activeTab?.offsetLeft}px)`
      });
    }
  }, [state.selectedKey]);

  let { focusProps, isFocusVisible } = useFocusRing({
    within: true
  });

  return (
    <div className="tabs">
      <div className="tablist-container">
        <div
          className={`tab-selection ${isFocusVisible ? "focused" : ""}`}
          style={{ zIndex: -1, ...activeTabStyle }}
        />
        <div {...mergeProps(tabListProps, focusProps)} ref={ref}>
          {[...state.collection].map((item) => (
            <Tab key={item.key} item={item} state={state} />
          ))}
        </div>
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}

function Tab<T>({ item, state }: { item: Node<T>; state: TabListState<T> }) {
  let ref = useRef(null);
  let { tabProps } = useTab(item, state, ref);

  return (
    <div {...tabProps} ref={ref}>
      {item.rendered}
    </div>
  );
}

function TabPanel<T>({ state, ...props }: { state: TabListState<T> }) {
  let ref = useRef(null);
  let { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
}
