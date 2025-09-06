import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/project_provider.dart';
import '../widgets/project_card.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final projectProvider = Provider.of<ProjectProvider>(context);

    return Scaffold(
      appBar: AppBar(title: Text('Projects')),
      body: ListView(
        children: [
          ...projectProvider.projects.map(
            (project) => ProjectCard(
              project: project,
              onTap: () {
                Navigator.pushNamed(context, '/project', arguments: project.id);
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, '/add_field_data');
        },
        child: Icon(Icons.add),
        tooltip: 'Add Field Data',
      ),
    );
  }
}