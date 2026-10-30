import json
from pathlib import Path
from typing import Any

DATA_FILE = Path(__file__).resolve().parents[1] / "src" / "data" / "medicineData.json"


def load_medicine_data() -> dict[str, Any]:
    with DATA_FILE.open(encoding="utf-8") as data_file:
        return json.load(data_file)
