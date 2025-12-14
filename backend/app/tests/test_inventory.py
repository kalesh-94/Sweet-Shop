# def setup_sweet(client):
#     headers = get_admin_header(client)

#     client.post(
#         "/api/sweets/",
#         json={
#             "name": "Barfi",
#             "category": "Indian",
#             "price": 15,
#             "quantity": 5,
#         },
#         headers=headers,
#     )

#     sweets = client.get("/api/sweets/", headers=headers).json()
#     return sweets[0]["_id"], headers


# def get_admin_header(client):
#     res = client.post(
#         "/api/auth/register",
#         json={"email": "admin2@mail.com", "password": "password123"},
#     )

#     from app.db.mongodb import user_collection
#     import asyncio

#     asyncio.run(
#         user_collection().update_one(
#             {"email": "admin2@mail.com"},
#             {"$set": {"role": "admin"}},
#         )
#     )

#     return {"Authorization": f"Bearer {res.json()['token']}"}


# def test_purchase_and_restock(client):
#     sweet_id, headers = setup_sweet(client)

#     # Purchase
#     response = client.post(
#         f"/api/sweets/{sweet_id}/purchase?quantity=2",
#         headers=headers,
#     )
#     assert response.status_code == 200

#     # Restock
#     response = client.post(
#         f"/api/sweets/{sweet_id}/restock?quantity=5",
#         headers=headers,
#     )
#     assert response.status_code == 200
