from typing import List, Optional, Any
from pydantic import BaseModel, EmailStr
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str]
    wallet_address: str
    role: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    user_id: str
    created_at: datetime

    class Config:
        orm_mode = True

# Project Schemas
class ProjectBase(BaseModel):
    project_name: str
    description: Optional[str]
    polygon: Any  # GeoJSON or WKT string
    tenure_docs: Optional[List[str]]
    method_id: str

class ProjectCreate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    project_id: str
    owner_id: str
    status: str
    created_at: datetime

    class Config:
        orm_mode = True

# Field Bundle Schemas
class FieldBundleBase(BaseModel):
    project_id: str
    submitted_by: str
    plots: dict
    soil_entries: dict
    photos: Optional[List[str]]
    drone_metadata: Optional[dict]
    signature: Optional[str]

class FieldBundleCreate(FieldBundleBase):
    pass

class FieldBundleOut(FieldBundleBase):
    bundle_id: str
    created_at: datetime

    class Config:
        orm_mode = True

# Storage Link Schemas
class StorageLinkBase(BaseModel):
    bundle_id: str
    minio_url: Optional[str]
    ipfs_cid: Optional[str]

class StorageLinkCreate(StorageLinkBase):
    pass

class StorageLinkOut(StorageLinkBase):
    storage_id: str
    created_at: datetime

    class Config:
        orm_mode = True

# MRV Job Schemas
class MRVJobBase(BaseModel):
    project_id: str
    bundle_id: str
    status: Optional[str]
    results_json: Optional[dict]
    report_pdf_url: Optional[str]
    merkle_root: Optional[str]
    ipfs_cid: Optional[str]

class MRVJobCreate(MRVJobBase):
    pass

class MRVJobOut(MRVJobBase):
    job_id: str
    created_at: datetime
    completed_at: Optional[datetime]

    class Config:
        orm_mode = True

# Verification Schemas
class VerificationBase(BaseModel):
    job_id: str
    verifier_id: str
    approval: Optional[bool]
    verifier_signature: Optional[str]
    comments: Optional[str]

class VerificationCreate(VerificationBase):
    pass

class VerificationOut(VerificationBase):
    verification_id: str
    created_at: datetime

    class Config:
        orm_mode = True

# Blockchain Commit Schemas
class BlockchainCommitBase(BaseModel):
    project_id: str
    job_id: str
    merkle_root: str
    ipfs_cid: str
    verifier_signature: str
    tx_hash: Optional[str]

class BlockchainCommitCreate(BlockchainCommitBase):
    pass

class BlockchainCommitOut(BlockchainCommitBase):
    commit_id: str
    committed_at: datetime

    class Config:
        orm_mode = True