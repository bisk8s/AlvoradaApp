import React, { Component } from 'react';
import { Surface, Chip, Subheading, Caption, Menu } from 'react-native-paper';
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
  onEditPressed: () => void;
  onDeletePressed: () => void;
}

interface State {
  menuVisible: boolean;
}

type ChipDataType =
  | string
  | {
      text: string;
      icon: string;
    };

export default class TouchableCard extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { menuVisible: false };
  }
  render() {
    return (
      <Menu
        visible={this.state.menuVisible}
        onDismiss={() => {
          this.setState({ menuVisible: false });
        }}
        anchor={
          <TouchableOpacity
            onPress={() => {
              this.setState({ menuVisible: true });
            }}
          >
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
                    <Chip
                      key={iChip.toString()}
                      icon={_.get(chip, 'icon', null)}
                    >
                      {_.get(chip, 'text', chip)}
                    </Chip>
                  );
                })}
              </View>
            </Surface>
          </TouchableOpacity>
        }
      >
        <Menu.Item
          title="Editar"
          icon="account-edit"
          onPress={() => {
            this.props.onEditPressed();
            this.setState({ menuVisible: false });
          }}
        />
        <Menu.Item
          title="Deletar"
          icon="account-remove"
          onPress={() => {
            this.props.onDeletePressed();
            this.setState({ menuVisible: false });
          }}
        />
      </Menu>
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
