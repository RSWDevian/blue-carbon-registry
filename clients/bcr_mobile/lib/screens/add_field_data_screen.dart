import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/field_report.dart';
import '../providers/field_report_provider.dart';
import '../widgets/field_form.dart';

class AddFieldDataScreen extends StatefulWidget {
  const AddFieldDataScreen({Key? key}) : super(key: key);

  @override
  State<AddFieldDataScreen> createState() => _AddFieldDataScreenState();
}

class _AddFieldDataScreenState extends State<AddFieldDataScreen> {
  final _formKey = GlobalKey<FormState>();
  final _projectIdController = TextEditingController();
  final _projectNameController = TextEditingController();
  final _collectorIdController = TextEditingController();
  final _notesController = TextEditingController();
  String? _selectedEcosystemType;
  double? _latitude;
  double? _longitude;
  List<MediaFile> _mediaFiles = [];

  void _pickLocation() async {
    // TODO: Integrate with LocationService
    setState(() {
      _latitude = 0.0;
      _longitude = 0.0;
    });
  }

  void _pickMedia() async {
    // TODO: Integrate with MediaService
    setState(() {
      _mediaFiles.add(MediaFile(
        fileName: 'example.jpg',
        fileType: 'photo',
        filePath: '/path/to/example.jpg',
      ));
    });
  }

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      final report = FieldReport(
        projectId: _projectIdController.text,
        projectName: _projectNameController.text,
        collectorId: _collectorIdController.text,
        date: DateTime.now(),
        latitude: _latitude ?? 0.0,
        longitude: _longitude ?? 0.0,
        ecosystemType: _selectedEcosystemType ?? 'other',
        fieldNotes: _notesController.text,
        media: _mediaFiles,
      );
      Provider.of<FieldReportProvider>(context, listen: false).addReport(report);

      Navigator.pushNamed(
        context,
        '/submission_success',
        arguments: {'jsonPreview': report.toJson().toString()},
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(title: Text('Add Field Data')),
      body: Center(
        child: Container(
          width: screenWidth * 0.8,
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(color: Colors.blueAccent, width: 2),
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black12,
                blurRadius: 8,
                offset: Offset(0, 4),
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: SingleChildScrollView(
              child: FieldForm(
                formKey: _formKey,
                projectIdController: _projectIdController,
                projectNameController: _projectNameController,
                collectorIdController: _collectorIdController,
                notesController: _notesController,
                selectedEcosystemType: _selectedEcosystemType,
                onEcosystemTypeChanged: (val) => setState(() => _selectedEcosystemType = val),
                onPickLocation: _pickLocation,
                latitude: _latitude,
                longitude: _longitude,
                onPickMedia: _pickMedia,
                mediaFiles: _mediaFiles,
                // Pass border decoration info to FieldForm if needed
              ),
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _submitForm,
        child: Icon(Icons.check),
        tooltip: 'Submit',
      ),
    );
  }
}