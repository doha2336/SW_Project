import requests, time
base='http://127.0.0.1:8000/api'
unique = str(int(time.time()))
# register seller
r = requests.post(base + '/auth/register/', json={'username':'img_seller_' + unique,'email':'img_seller_' + unique + '@example.com','password':'Testpass123!','user_type':'seller'})
print('seller register', r.status_code, r.text)
if r.status_code in (200,201):
    tokens = r.json()
    access = tokens.get('access')
    headers = {'Authorization': f'Bearer {access}'}
    fp = 'project/The project front/buyer/src/assets/product1.jpg.jpeg'
    with open(fp, 'rb') as f:
        files = {'image': ('product1.jpg', f, 'image/jpeg')}
        data = {'name':'Image Test Product', 'description':'with image', 'price':'12.00', 'stock':3, 'category':'wood'}
        r2 = requests.post(base + '/products/', headers=headers, files=files, data=data)
        print('create with image', r2.status_code, r2.text)
        if r2.status_code == 201:
            prod = r2.json()
            # create buyer and order
            b = requests.post(base + '/auth/register/', json={'username':'img_buyer_' + unique,'email':'img_buyer_' + unique + '@example.com','password':'Testpass123!','user_type':'buyer'})
            print('register buyer', b.status_code)
            bt = b.json()
            access_b = bt.get('access')
            hb = {'Authorization': f'Bearer {access_b}'}
            o = requests.post(base + '/orders/', json={'product':prod['id'],'quantity':1}, headers=hb)
            print('create order', o.status_code, o.text)
            so = requests.get(base + '/orders/seller/', headers=headers)
            print('seller orders', so.status_code, so.text)
else:
    print('seller register failed')