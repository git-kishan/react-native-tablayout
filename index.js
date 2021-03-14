import React, {useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';

const {width} = Dimensions.get('window');

const TabLayout = (props) => {
  const listRef = useRef();
  const indicatorRef = useRef(new Animated.Value(0)).current;
  const indicatorInterpolator = indicatorRef.interpolate({
    inputRange: [0, width],
    outputRange: [0, width / props.screens.length],
  });
  const makeListScrollable = (index) => {
    listRef?.current?.scrollToIndex({animated: true, index});
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flexDirection: 'row',
          width,
          height: props.tabHeight === undefined ? 50 : props.tabHeight,
        }}>
        <Animated.View
          style={[
            {
              height:
                props.indicatorHeight === undefined ? 5 : props.indicatorHeight,
              width: width / props.screens.length,
              backgroundColor:
                props.indicatorColor === undefined
                  ? 'white'
                  : props.indicatorColor,
              position: 'absolute',
              bottom: 0,
              borderRadius:
                props.indicatorRadius === undefined ? 5 : props.indicatorRadius,
              elevation: 100,
              zIndex: 100,
            },
            {transform: [{translateX: indicatorInterpolator}]},
          ]}
        />
        {props.tabName.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => makeListScrollable(index)}
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? props.tabPressedColor === undefined
                      ? '#3f51b5'
                      : props.tabPressedColor
                    : props.tabColor === undefined
                    ? '#1a237e'
                    : props.tabColor,
                },
                {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={{
                  fontSize:
                    props.titleFontSize === undefined
                      ? 90 / props.screens.length
                      : props.titleFontSize,
                  fontWeight:
                    props.titleFontWeight === undefined
                      ? 'bold'
                      : props.titleFontWeight,
                  color:
                    props.titleColor === undefined ? 'white' : props.titleColor,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? props.titleFontFamilyIos === undefined
                        ? 'Helvetica'
                        : props.titleFontFamilyIos
                      : props.titleFontFamilyAndroid === undefined
                      ? 'Roboto'
                      : props.titleFontFamilyAndroid,
                  fontStyle:
                    props.titleFontStyle === undefined
                      ? 'normal'
                      : props.titleFontStyle,
                }}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        ref={listRef}
        data={props.screens}
        horizontal={true}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={(ev) => indicatorRef.setValue(ev.nativeEvent.contentOffset.x)}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => item}
      />
    </View>
  );
};

export default TabLayout;
