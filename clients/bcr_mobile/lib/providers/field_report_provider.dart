import 'package:flutter/material.dart';
import '../models/field_report.dart';

class FieldReportProvider extends ChangeNotifier {
  final List<FieldReport> _reports = [];

  List<FieldReport> get reports => List.unmodifiable(_reports);

  void addReport(FieldReport report) {
    _reports.add(report);
    notifyListeners();
  }
}