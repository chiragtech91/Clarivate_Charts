import json
from pathlib import Path
from typing import Any

from fastapi import FastAPI

app = FastAPI(title="Medicine Dashboard API")
DATA_FILE = Path(__file__).resolve().parents[1] / "src" / "data" / "medicineData.json"


@app.get("/api/medicine-data")
def get_medicine_data() -> dict[str, Any]:
    with DATA_FILE.open(encoding="utf-8") as data_file:
        return json.load(data_file)
