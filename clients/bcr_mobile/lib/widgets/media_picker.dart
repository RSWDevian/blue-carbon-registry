import 'package:flutter/material.dart';
import '../models/field_report.dart';

class MediaPicker extends StatelessWidget {
  final List<MediaFile> mediaFiles;
  final VoidCallback onAddMedia;

  const MediaPicker({
    Key? key,
    required this.mediaFiles,
    required this.onAddMedia,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Media Files (${mediaFiles.length})'),
        Wrap(
          children: mediaFiles
              .map((media) => Padding(
                    padding: const EdgeInsets.all(4.0),
                    child: Chip(label: Text(media.fileName)),
                  ))
              .toList(),
        ),
        ElevatedButton(
          onPressed: onAddMedia,
          child: Text('Add Media'),
        ),
      ],
    );
  }
}