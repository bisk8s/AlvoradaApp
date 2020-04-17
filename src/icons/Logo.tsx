import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import Svg, { G, Polygon } from 'react-native-svg';
const { width, height } = Dimensions.get('screen');

import _ from 'lodash';

interface Props extends React.SVGProps<SVGSVGElement> {
  style?: any;
}

const SIZE = 160;
class Logo extends Component<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    const viewBox = {
      width: _.get(this.props, 'style.width', width),
      height: _.get(this.props, 'style.height', height)
    };

    return (
      <Svg
        style={{ ...this.props.style }}
        width={viewBox.width}
        height={viewBox.width}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        fill={this.props.fill || '#211d1d'}
      >
        <G transform={`translate(${SIZE / 2},${SIZE / 2})`}>
          <G transform={`translate(-${SIZE / 2},-${SIZE / 2})`}>
            <Polygon
              points={[
                `${SIZE * 0.5},${0}`,
                `${SIZE * 0.2},${SIZE}`,
                `${SIZE},${SIZE * 0.4}`,
                `${0},${SIZE * 0.4}`,
                `${SIZE * 0.8},${SIZE}`
              ].join(' ')}
            />
          </G>
        </G>
      </Svg>
    );
  }
}

export default Logo;
