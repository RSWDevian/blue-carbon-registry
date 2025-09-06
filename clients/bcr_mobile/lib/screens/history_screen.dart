import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/field_report_provider.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final reportProvider = Provider.of<FieldReportProvider>(context);

    return Scaffold(
      appBar: AppBar(title: Text('Submission History')),
      body: ListView.builder(
        itemCount: reportProvider.reports.length,
        itemBuilder: (context, index) {
          final report = reportProvider.reports[index];
          return ListTile(
            title: Text(report.projectName),
            subtitle: Text('Status: Pending verification'),
            trailing: Icon(Icons.history),
          );
        },
      ),
    );
  }
}