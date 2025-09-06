
# System Design

## System Architecture Overview:

![System Overview](diagrams/System%20Overview.png)
*Fig 1: A minimalistic over view of how the system will work.*

1. ***Field Client(Mobile, Flutter):*** Offline app for plot-capture, photos, solid samples, geotagging, local signing, and queued upload.
2. ***Uploader/Drone CLI(Python):*** Uploads orthomasaics/DEM/multispectral imagery+metadata.
3. ***Ingestion Service(FastAPI):*** Validates uploads, stores metadata, places files in object store and IPFS, enquires MRV jobs.
4. ***MRV compute pipeline(Python,Airflow/Celery):*** Executes methodology: allometry, soil carbon, remote-sensing analysis, uncertainty calculations; outputs dataset, PDF report and JSON package.
5. ***Storage:***  
   1. _Postgres+PostGIS_ : vector & tabular geodata.
   2. _MinIO/S3_: large objects(images, orthomosaics).
   3. _IPFS:_ Immutable MRV package pinning and CIDs.
6. ***Blockchain layer(Hyperledger Besu/Quorum):*** Permissioned EVM for registry, MRV commits and ERC-1155 token insuarance; optionalanchoring to polygon.
7. ***Smart Contract(Solidity):*** Registry, MRVCommit, Credit 1155, Bufferproof, AccessControl.
8. ***Web UI(Next.js):*** Admin, proponent, verifier, buyer dashboards and public explorer.
9. ***Identuty & Auth:*** OICD for web flows, wallet based signin for provenance.
10. ***Marketplace / Retirement Service:*** Optional marketplace and retirement certificate generator.
11. ***Monitoring / DevOps:*** K8s, Prometheus, Grafana, Loki, CI/CD.

## Logical Data Workflow:

![Data Flow System Design](diagrams/Data%20Flow%20System%20Design.jpg)
*Fig 2: Logical data flow system design*

### 1. Project Registration:

- Regristration of project via wen UI -> submits polygon, tenure docs, methodology id.
- Backend stores project record in Postgre and docs to MinIO, and then stored in IPFS.

### 2. Data Capture:

- Data collection from Field User(Mobile App).
- Data Collection from Drone(Python CLI).

### 3. Ingestion & Storage:

- Respective project details sotored in respective project number.
- Validates signatures, persists files to MinIO and metadata to Postgres.
- Send data in queue for MRV verification.

### 4. MRV Compute:

- Pull relevant files, runs calculations, produces results.json, report.pdf.
- Builds merkle tree over dataset to compute Merkle root verification.

