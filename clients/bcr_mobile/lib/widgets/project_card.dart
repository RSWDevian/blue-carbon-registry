import 'package:flutter/material.dart';
import '../models/project.dart';

class ProjectCard extends StatelessWidget {
  final Project project;
  final VoidCallback? onTap;

  const ProjectCard({Key? key, required this.project, this.onTap}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(project.name),
        subtitle: Text('${project.location} • ${project.ecosystemType}'),
        onTap: onTap,
      ),
    );
  }
}