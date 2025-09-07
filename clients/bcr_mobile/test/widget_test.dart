import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:bcr_mobile/app.dart';

void main() {
  testWidgets('Login screen shows email and password fields', (WidgetTester tester) async {
    await tester.pumpWidget(const App());

    expect(find.text('Email'), findsOneWidget);
    expect(find.text('Password'), findsOneWidget);
    expect(find.text('Login'), findsOneWidget);
  });
}