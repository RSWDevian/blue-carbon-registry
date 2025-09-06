import 'package:flutter/material.dart';
import 'screens/login_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/add_field_data_screen.dart';
import 'screens/submission_success_screen.dart';
import 'screens/history_screen.dart';

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Blue Carbon Field App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginScreen(),
        '/dashboard': (context) => const DashboardScreen(),
        '/add_field_data': (context) => const AddFieldDataScreen(),
        '/submission_success': (context) => SubmissionSuccessScreen(jsonPreview: '{}'),
        '/history': (context) => const HistoryScreen(),
      },
    );
  }
}