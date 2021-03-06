/**
 * Copyright (c) INOVUA SOFTWARE TECHNOLOGIES.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isControlledValue from './isControlledValue';

export default (props: any, propName: string): boolean => {
  if (!props) {
    return false;
  }
  return isControlledValue(props[propName]);
};
