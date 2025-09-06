import 'package:flutter/material.dart';

class LocationPicker extends StatelessWidget {
  final double? latitude;
  final double? longitude;
  final VoidCallback onPickLocation;

  const LocationPicker({
    Key? key,
    required this.latitude,
    required this.longitude,
    required this.onPickLocation,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(latitude != null && longitude != null
            ? 'Lat: $latitude, Lng: $longitude'
            : 'No location selected'),
        TextButton(
          onPressed: onPickLocation,
          child: Text('Pick Location'),
        ),
      ],
    );
  }
}