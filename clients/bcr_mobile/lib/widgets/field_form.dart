import 'package:flutter/material.dart';
import '../models/field_report.dart';

class FieldForm extends StatelessWidget {
  final GlobalKey<FormState> formKey;
  final TextEditingController projectIdController;
  final TextEditingController projectNameController;
  final TextEditingController collectorIdController;
  final TextEditingController notesController;
  final String? selectedEcosystemType;
  final Function(String?) onEcosystemTypeChanged;
  final VoidCallback onPickLocation;
  final double? latitude;
  final double? longitude;
  final VoidCallback onPickMedia;
  final List<MediaFile> mediaFiles;

  const FieldForm({
    Key? key,
    required this.formKey,
    required this.projectIdController,
    required this.projectNameController,
    required this.collectorIdController,
    required this.notesController,
    required this.selectedEcosystemType,
    required this.onEcosystemTypeChanged,
    required this.onPickLocation,
    required this.latitude,
    required this.longitude,
    required this.onPickMedia,
    required this.mediaFiles,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final inputDecoration = InputDecoration(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    );

    return Form(
      key: formKey,
      child: Column(
        children: [
          TextFormField(
            controller: projectIdController,
            decoration: inputDecoration.copyWith(labelText: 'Project ID'),
            validator: (value) => value == null || value.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: projectNameController,
            decoration: inputDecoration.copyWith(labelText: 'Project Name'),
            validator: (value) => value == null || value.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: collectorIdController,
            decoration: inputDecoration.copyWith(labelText: 'Collector ID'),
            validator: (value) => value == null || value.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          DropdownButtonFormField<String>(
            value: selectedEcosystemType,
            items: [
              'mangrove',
              'seagrass',
              'forest',
              'wetland',
              'other',
            ].map((type) => DropdownMenuItem(value: type, child: Text(type))).toList(),
            onChanged: onEcosystemTypeChanged,
            decoration: inputDecoration.copyWith(labelText: 'Ecosystem Type'),
            validator: (value) => value == null || value.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: notesController,
            decoration: inputDecoration.copyWith(labelText: 'Field Notes'),
            maxLines: 3,
          ),
          SizedBox(height: 16),
          Row(
            children: [
              Text(latitude != null && longitude != null
                  ? 'Lat: $latitude, Lng: $longitude'
                  : 'No location'),
              TextButton(
                onPressed: onPickLocation,
                child: Text('Pick Location'),
              ),
            ],
          ),
          Row(
            children: [
              Text('Media: ${mediaFiles.length} files'),
              TextButton(
                onPressed: onPickMedia,
                child: Text('Add Media'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}