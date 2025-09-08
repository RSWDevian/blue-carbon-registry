from sqlalchemy import (
    Column, String, Integer, Boolean, DateTime, ForeignKey, Text, JSON, ARRAY
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from .database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    user_id = Column(String(255), primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(20))
    wallet_address = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    role = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    projects = relationship("Project", back_populates="owner")
    field_bundles = relationship("FieldBundle", back_populates="submitter")
    verifications = relationship("Verification", back_populates="verifier")

class Project(Base):
    __tablename__ = "projects"
    project_id = Column(String(64), primary_key=True)
    owner_id = Column(String(255), ForeignKey("users.user_id"))
    name = Column(String(255), nullable=False)
    description = Column(Text)
    polygon = Column(Geometry("POLYGON", srid=4326), nullable=False)
    tenure_docs = Column(ARRAY(Text))
    method_id = Column(String(50), nullable=False)
    status = Column(String(50), default="registered")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="projects")
    field_bundles = relationship("FieldBundle", back_populates="project")
    mrv_jobs = relationship("MRVJob", back_populates="project")
    blockchain_commits = relationship("BlockchainCommit", back_populates="project")

class FieldBundle(Base):
    __tablename__ = "field_bundles"
    bundle_id = Column(String(255), primary_key=True)
    project_id = Column(String(64), ForeignKey("projects.project_id"))
    submitted_by = Column(String(255), ForeignKey("users.user_id"))
    plots = Column(JSONB)
    soil_entries = Column(JSONB)
    photos = Column(ARRAY(Text))
    drone_metadata = Column(JSONB)
    signature = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="field_bundles")
    submitter = relationship("User", back_populates="field_bundles")
    storage_links = relationship("StorageLink", back_populates="bundle")
    mrv_jobs = relationship("MRVJob", back_populates="bundle")

class StorageLink(Base):
    __tablename__ = "storage_links"
    storage_id = Column(String(255), primary_key=True)
    bundle_id = Column(String(255), ForeignKey("field_bundles.bundle_id"))
    minio_url = Column(Text)
    ipfs_cid = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    bundle = relationship("FieldBundle", back_populates="storage_links")

class MRVJob(Base):
    __tablename__ = "mrv_jobs"
    job_id = Column(String(255), primary_key=True)
    project_id = Column(String(64), ForeignKey("projects.project_id"))
    bundle_id = Column(String(255), ForeignKey("field_bundles.bundle_id"))
    status = Column(String(50), default="pending")
    results_json = Column(JSONB)
    report_pdf_url = Column(Text)
    merkle_root = Column(Text)
    ipfs_cid = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime)

    project = relationship("Project", back_populates="mrv_jobs")
    bundle = relationship("FieldBundle", back_populates="mrv_jobs")
    verifications = relationship("Verification", back_populates="job")
    blockchain_commits = relationship("BlockchainCommit", back_populates="job")

class Verification(Base):
    __tablename__ = "verifications"
    verification_id = Column(String(255), primary_key=True)
    job_id = Column(String(255), ForeignKey("mrv_jobs.job_id"))
    verifier_id = Column(String(255), ForeignKey("users.user_id"))
    approval = Column(Boolean)
    verifier_signature = Column(Text)
    comments = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    job = relationship("MRVJob", back_populates="verifications")
    verifier = relationship("User", back_populates="verifications")

class BlockchainCommit(Base):
    __tablename__ = "blockchain_commits"
    commit_id = Column(String(255), primary_key=True)
    project_id = Column(String(64), ForeignKey("projects.project_id"))
    job_id = Column(String(255), ForeignKey("mrv_jobs.job_id"))
    merkle_root = Column(Text, nullable=False)
    ipfs_cid = Column(Text, nullable=False)
    verifier_signature = Column(Text, nullable=False)
    tx_hash = Column(Text)
    committed_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="blockchain_commits")
    job = relationship("MRVJob", back_populates="blockchain_commits")