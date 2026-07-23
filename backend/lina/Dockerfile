FROM python:3.12-slim

WORKDIR /app

# System deps for passagemath-polyhedra runtime
# libgmp10 is the only runtime library needed — passagemath ships
# pre-compiled manylinux wheels with all native deps bundled.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgmp10 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["uvicorn", "lina_service:app", "--host", "0.0.0.0", "--port", "8001"]
