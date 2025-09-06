//? field report model
class FieldReport {
  final String projectId;
  final String projectName;
  final String collectorId;
  final DateTime date;
  final double latitude;
  final double longitude;
  final String ecosystemType;
  final String fieldNotes;
  final List<MediaFile> media;

  FieldReport({
    required this.projectId,
    required this.projectName,
    required this.collectorId,
    required this.date,
    required this.latitude,
    required this.longitude,
    required this.ecosystemType,
    required this.fieldNotes,
    required this.media,
  });

  Map<String, dynamic> toJson() => {
        "project_id": projectId,
        "project_name": projectName,
        "collector_id": collectorId,
        "date": date.toIso8601String().split('T').first,
        "location": {
          "latitude": latitude,
          "longitude": longitude,
        },
        "ecosystem_type": ecosystemType,
        "field_notes": fieldNotes,
        "media": media.map((m) => m.toJson()).toList(),
      };
}

//? media file model
class MediaFile {
  final String fileName;
  final String fileType; // photo, drone_image, document
  final String filePath;

  MediaFile({
    required this.fileName,
    required this.fileType,
    required this.filePath,
  });

  Map<String, dynamic> toJson() => {
        "file_name": fileName,
        "file_type": fileType,
        "file_path": filePath,
      };
}