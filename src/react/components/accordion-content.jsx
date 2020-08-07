import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  COLOR_PROPS
*/

const AccordionContent = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));
  const dataAttrs = getExtraAttrs(props);

  const classes = classNames(className, 'accordion-item-content', colorClasses(props));
  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
    </div>
  );
});

AccordionContent.displayName = 'f7-accordion-content';

export default AccordionContent;
