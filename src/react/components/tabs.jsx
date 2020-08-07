import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect';
import { classNames, getExtraAttrs } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

/* dts-imports
import { SwiperOptions } from 'swiper';
*/
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  animated? : boolean
  swipeable? : boolean
  routable? : boolean
  swiperParams? : SwiperOptions
  COLOR_PROPS
*/

const Tabs = forwardRef((props, ref) => {
  const { className, id, style, children, animated, swipeable, routable, swiperParams } = props;
  const dataAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useIsomorphicLayoutEffect(() => {
    if (!swipeable || !swiperParams) return;
    if (!elRef.current) return;
    elRef.current.f7SwiperParams = swiperParams;
  }, []);

  const classes = classNames(className, colorClasses(props));
  const wrapClasses = classNames({
    'tabs-animated-wrap': animated,
    'tabs-swipeable-wrap': swipeable,
  });
  const tabsClasses = classNames({
    tabs: true,
    'tabs-routable': routable,
  });

  if (animated || swipeable) {
    return (
      <div
        id={id}
        style={style}
        className={classNames(wrapClasses, classes)}
        ref={elRef}
        {...dataAttrs}
      >
        <div className={tabsClasses}>{children}</div>
      </div>
    );
  }

  return (
    <div
      id={id}
      style={style}
      className={classNames(tabsClasses, classes)}
      ref={elRef}
      {...dataAttrs}
    >
      {children}
    </div>
  );
});

Tabs.displayName = 'f7-tabs';

export default Tabs;
