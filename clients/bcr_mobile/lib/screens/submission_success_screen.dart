import 'package:flutter/material.dart';

class SubmissionSuccessScreen extends StatelessWidget {
  final String jsonPreview;

  const SubmissionSuccessScreen({Key? key, required this.jsonPreview}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Submission Success')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Icon(Icons.check_circle, color: Colors.green, size: 64),
            SizedBox(height: 16),
            Text('Submission Successful!', style: TextStyle(fontSize: 20)),
            SizedBox(height: 16),
            Text('JSON Preview:'),
            SizedBox(height: 8),
            Expanded(
              child: SingleChildScrollView(
                child: Text(jsonPreview, style: TextStyle(fontFamily: 'monospace')),
              ),
            ),
            ElevatedButton(
              onPressed: () => Navigator.popUntil(context, ModalRoute.withName('/dashboard')),
              child: Text('Back to Dashboard'),
            ),
          ],
        ),
      ),
    );
  }
}