import 'package:flutter/material.dart';

class AddFieldDataScreen extends StatelessWidget {
  const AddFieldDataScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // You will wire up the FieldForm widget here
    return Scaffold(
      appBar: AppBar(title: Text('Add Field Data')),
      body: Center(child: Text('Field Data Form goes here')),
    );
  }
}