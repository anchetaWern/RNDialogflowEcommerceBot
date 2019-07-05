import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class App extends Component {

	render() {
		return (
			<View style={styles.container}>
				<Text>Hello world!</Text>
			</View>
		);
	}
}
//

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;