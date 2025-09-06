//? Provider for handling authentication state

import 'package:flutter/material.dart';

class AuthProvider extends ChangeNotifier {
  String? _userId;

  String? get userId => _userId;

  bool get isLoggedIn => _userId != null;

  // Mock login for UI flow
  Future<void> login(String email, String password) async {
    // Simulate network delay
    await Future.delayed(Duration(seconds: 1));
    _userId = email; // Use email as userId for mock
    notifyListeners();
  }

  void logout() {
    _userId = null;
    notifyListeners();
  }
}