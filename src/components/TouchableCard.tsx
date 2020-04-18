import React, { Component } from 'react';
import { Surface, Chip, Subheading, Caption } from 'react-native-paper';
import _ from 'lodash';

import { TouchableOpacity, View } from 'react-native';
import CategoryIcon, { CategoryIconType } from '../icons/CategoryIcon';

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

interface Props {
  title: string;
  caption?: string;
  icon: CategoryIconType;
  chips?: ChipDataType[];
  onPress: () => void;
}

type ChipDataType =
  | string
  | {
      text: string;
      icon: string;
    };

export default class TouchableCard extends Component<Props> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Surface style={styles.surface}>
          <CategoryIcon icon={this.props.icon} />
          <Subheading style={{ textAlign: 'center' }}>
            {this.props.title}
          </Subheading>
          <Caption style={{ textAlign: 'center' }}>
            {this.props.caption}
          </Caption>
          <View style={{ flexDirection: 'row' }}>
            {_.map(this.props.chips, (chip, iChip) => {
              return (
                <Chip key={iChip.toString()} icon={_.get(chip, 'icon', null)}>
                  {_.get(chip, 'text', chip)}
                </Chip>
              );
            })}
          </View>
        </Surface>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    marginBottom: 8,
    marginRight: 8,
    padding: 8,
    width: width * 0.9 * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4
  }
});
