import {AppText} from 'common/text';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {styles} from './styles';

const {width} = Dimensions.get('window');

type TabType = {
  tabKey: string;
  tabName: string;
};

interface TabProps {
  setActiveTab(type: string): void;
  activeTab: string;
  tabs: TabType[];
  tabContainerStyle?: StyleProp<ViewStyle>;
}

export const AppTab: React.FC<TabProps> = ({
  activeTab,
  setActiveTab,
  tabs,
  tabContainerStyle,
}) => {
  return (
    <View style={[styles.container, tabContainerStyle]}>
      {tabs.map(item => (
        <TouchableOpacity
          key={item.tabKey}
          style={[
            activeTab === item.tabKey ? styles.activeTab : styles.tab,
            styles.TabLeft,
            {width: (width - 44) / tabs.length},
          ]}
          onPress={() => setActiveTab(item.tabKey)}>
          <AppText>{item.tabName}</AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};
