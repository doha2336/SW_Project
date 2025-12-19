import requests
base='http://127.0.0.1:8000/api'

# Register seller (try register with unique email)
import time
unique = str(int(time.time()))
r = requests.post(base+'/auth/register/', json={'username':'test_seller_' + unique,'email':'seller_' + unique + '@example.com','password':'Testpass123!','user_type':'seller'})
print('register seller', r.status_code, r.text)
if r.status_code in (200,201):
    tokens = r.json()
else:
    # Try to login
    s = requests.post(base+'/auth/login/', json={'email':'seller@example.com','password':'Testpass123!'})
    print('login seller', s.status_code, s.text)
    tokens = s.json() if s.status_code==200 else None

if tokens:
    access = tokens.get('access')
    headers = {'Authorization': f'Bearer {access}'}
    p = requests.post(base+'/products/', json={'name':'Test Product','description':'desc','price':'10.00','stock':5,'category':'wood'}, headers=headers)
    print('create product', p.status_code, p.text)
    prod = p.json() if p.status_code==201 else None
    if prod:
        # Register buyer (use same unique suffix)
        b = requests.post(base+'/auth/register/', json={'username':'test_buyer_' + unique,'email':'buyer_' + unique + '@example.com','password':'Testpass123!','user_type':'buyer'})
        print('register buyer', b.status_code, b.text)
        if b.status_code in (200,201):
            buyer_tokens = b.json()
        else:
            bl = requests.post(base+'/auth/login/', json={'email':'buyer_' + unique + '@example.com','password':'Testpass123!'})
            print('login buyer', bl.status_code, bl.text)
            buyer_tokens = bl.json() if bl.status_code==200 else None
        if buyer_tokens:
            access_b = buyer_tokens.get('access')
            headers_b = {'Authorization': f'Bearer {access_b}'}
            # Create order
            o = requests.post(base+'/orders/', json={'product': prod['id'], 'quantity': 2}, headers=headers_b)
            print('create order', o.status_code, o.text)
            # Check seller can see order
            s_orders = requests.get(base + '/orders/seller/', headers=headers)
            print('seller orders', s_orders.status_code, s_orders.text)
else:
    print('could not obtain seller credentials')
