import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

Future<String?> signIn(String email, String password) async {
  final url = Uri.parse('https://blue-carbon-registry.vercel.app/api/auth/signin'); 

  final response = await http.post(
    url,
    headers: {'Content-Type': 'application/json'}, // Add this header
    body: json.encode({
      'email': email,
      'password': password,
    }),
  );

  print('Status code: ${response.statusCode}');
  print('Response body: ${response.body}');

  if (response.statusCode == 200) {
    final data = json.decode(response.body);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('email', email);
    await prefs.setString('password', password);
    if (data['token'] != null) {
      await prefs.setString('token', data['token']);
    }
    return null; // Success
  } else {
    try {
      final data = json.decode(response.body);
      return data['error']?.toString() ?? response.body;
    } catch (_) {
      return response.body;
    }
  }
}