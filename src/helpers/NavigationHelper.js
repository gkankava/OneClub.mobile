import * as React from 'react';

export default class NavigationHelper {
  static navigationRef = React.createRef();
  static initialRoute = '';

  static setInitialRoute = route => {
    this.initialRoute = route;
  };

  static canGoBack = () => {
    return this.navigationRef.current?.canGoBack() || false;
  };

  static pop = () => {
    this.navigationRef.current?.goBack();
  };

  static popCount = countPop => {
    new Array(countPop).fill(null).map(() => {
      this.pop();
    });
  };

  static navigate = (routeName, params) => {
    setTimeout(
      () => this.navigationRef.current?.navigate(routeName, params),
      0,
    );
  };

  static replace = (routeName, params) => {
    setTimeout(
      () =>
        this.navigationRef.current?.reset({
          index: 0,
          routes: [{name: routeName, params: params}],
        }),
      0,
    );
  };

  static resetToScreen = routes => {
    this.navigationRef.current?.resetRoot({
      index: 0,
      routes,
    });
  };
}
