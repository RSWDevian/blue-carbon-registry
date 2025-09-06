
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
- Pin MRV bunde to IPFS -> get cid.
- stores it in database.

### 5. Verification:

- Verifier reviews via verifier dashboard; reruns calculations using provided scripts, to check the data uniqueness and result validity.
- Verifier signs approval (ECDSA signature) and uploads verified package.

### 6. On-chain MRV commit:

- Verifier commits the verified MRV bundle by calling the submitVerifiedMRV(projectID, vintage, merkleroor, cid, verifierSig) on the registry contract.
- Contract will validate Verifier role and emits MRVCommitted event.

### 7: Issance:

- NCCR admin calls mintCredits(projectID, vintage, qty) -> ERC-1155 tokens minted and buffer allocation done.

### 8: Trade/Retirement:
- Tokens transfered via standard ERC-1155 methods.
- To reture: retire(tokenId, qty, beneficiary, purpose, certCID)



