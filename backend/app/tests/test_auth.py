def test_register_user(client):
    response = client.post(
        "/api/auth/register",
        json={"email": "test@mail.com", "password": "password123"},
    )

    assert response.status_code == 201
    body = response.json()
    assert "token" in body
    assert body["user"]["email"] == "test@mail.com"


def test_login_user(client):
    # Register first
    client.post(
        "/api/auth/register",
        json={"email": "login@mail.com", "password": "password123"},
    )

    response = client.post(
        "/api/auth/login",
        json={"email": "login@mail.com", "password": "password123"},
    )

    assert response.status_code == 200
    assert "token" in response.json()


def test_login_invalid_credentials(client):
    response = client.post(
        "/api/auth/login",
        json={"email": "wrong@mail.com", "password": "wrongpass"},
    )

    assert response.status_code == 401
