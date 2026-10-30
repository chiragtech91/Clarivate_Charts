from typing import Any

from fastapi import FastAPI

from backend.data import load_medicine_data

app = FastAPI(title="Medicine Dashboard API")


@app.get("/api/medicine-data")
def get_medicine_data() -> dict[str, Any]:
    return load_medicine_data()
