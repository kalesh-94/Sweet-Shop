def get_auth_header(client, email="admin@mail.com", role="admin"):
    # Register user
    res = client.post(
        "/api/auth/register",
        json={"email": email, "password": "password123"},
    )

    # Make user admin manually (test shortcut)
    from app.db.mongodb import user_collection
    import asyncio

    asyncio.run(
        user_collection().update_one(
            {"email": email},
            {"$set": {"role": role}},
        )
    )

    token = res.json()["token"]
    return {"Authorization": f"Bearer {token}"}


def test_add_and_list_sweets(client):
    headers = get_auth_header(client)

    # Add sweet
    response = client.post(
        "/api/sweets/",
        json={
            "name": "Ladoo",
            "category": "Indian",
            "price": 10,
            "quantity": 20,
        },
        headers=headers,
    )

    assert response.status_code == 201

    # List sweets
    response = client.get("/api/sweets/", headers=headers)
    assert response.status_code == 200
    assert len(response.json()) == 1
