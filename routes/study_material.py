from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.study_material import StudyMaterial, StudyMaterialCreate
from src.lib import database   

from auth import get_current_user

router = APIRouter()

@router.post("/", response_model=StudyMaterial)
async def create_study_material(
    material: StudyMaterialCreate, current_user: dict = Depends(get_current_user)
):
    try:
        if current_user["user_type"] != "teacher":
            raise HTTPException(status_code=403, detail="Only teachers can create study materials")
        material_data = material.dict()
        material_data["teacher_id"] = current_user["id"]
        response = supabase.table("study_materials").insert(material_data).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=List[StudyMaterial])
async def list_study_materials(subject: Optional[str] = None):
    try:
        query = supabase.table("study_materials").select("*")
        if subject:
            query = query.eq("subject", subject)
        response = query.execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{material_id}", response_model=StudyMaterial)
async def get_study_material(material_id: str):
    try:
        response = supabase.table("study_materials").select("*").eq("id", material_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Material not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{material_id}", response_model=StudyMaterial)
async def update_study_material(
    material_id: str, material: StudyMaterialCreate, current_user: dict = Depends(get_current_user)
):
    try:
        existing_material = supabase.table("study_materials").select("*").eq("id", material_id).execute()
        if not existing_material.data:
            raise HTTPException(status_code=404, detail="Material not found")
        if existing_material.data[0]["teacher_id"] != current_user["id"]:
            raise HTTPException(status_code=403, detail="You can only update your own materials")
        response = supabase.table("study_materials").update(material.dict()).eq("id", material_id).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{material_id}")
async def delete_study_material(material_id: str, current_user: dict = Depends(get_current_user)):
    try:
        existing_material = supabase.table("study_materials").select("*").eq("id", material_id).execute()
        if not existing_material.data:
            raise HTTPException(status_code=404, detail="Material not found")
        if existing_material.data[0]["teacher_id"] != current_user["id"]:
            raise HTTPException(status_code=403, detail="You can only delete your own materials")
        supabase.table("study_materials").delete().eq("id", material_id).execute()
        return {"message": "Material deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
