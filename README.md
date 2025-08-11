# Plant Shop App với Redux

Ứng dụng React Native quản lý cửa hàng cây cảnh sử dụng Redux để quản lý state.

## Tính năng đã tích hợp Redux:

### 1. Quản lý sản phẩm (Product Management)
- **CRUD Operations:**
  - ✅ **Create**: Thêm sản phẩm mới
  - ✅ **Read**: Hiển thị danh sách sản phẩm
  - ✅ **Update**: Sửa thông tin sản phẩm
  - ✅ **Delete**: Xóa sản phẩm
- **Redux Store**: `productReducer.js`
- **Actions**: `productAction.js`

### 2. Quản lý giỏ hàng (Cart Management)
- **CRUD Operations:**
  - ✅ **Create**: Thêm sản phẩm vào giỏ hàng
  - ✅ **Read**: Hiển thị giỏ hàng
  - ✅ **Update**: Cập nhật số lượng sản phẩm
  - ✅ **Delete**: Xóa sản phẩm khỏi giỏ hàng
- **Redux Store**: `cartReducer.js`
- **Tính năng**: Tự động tính tổng tiền, tổng số lượng

## Cấu trúc Redux:

```
redux/
├── store/
│   └── store.js          # Cấu hình Redux store
├── reducers/
│   ├── productReducer.js # Quản lý state sản phẩm
│   └── cartReducer.js    # Quản lý state giỏ hàng
└── actions/
    └── productAction.js  # Actions cho sản phẩm
```

## Cách chạy ứng dụng:

### 1. Cài đặt dependencies:
```bash
npm install
```

### 2. Chạy JSON Server (Mock API):

**Cách 1: Sử dụng npm script (đã có sẵn trong package.json):**
```bash
npm run server
```

**Cách 2: Chạy trực tiếp với npx:**
```bash
npx json-server --watch db.json --port 3000
```

**Cách 3: Nếu đã cài json-server global:**
```bash
json-server --watch db.json --port 3000
```

Server sẽ chạy tại: `http://localhost:3000`
- API Products: `http://localhost:3000/products`
- API Carts: `http://localhost:3000/carts`

### 3. Chạy ứng dụng Expo:
```bash
npm start
```

### 4. Cập nhật URL API:
Trong file `redux/actions/productAction.js`, thay đổi `apiUrl` thành địa chỉ IP của máy bạn:
```javascript
const apiUrl = "http://[YOUR_IP]:3000/products";
```

## Các màn hình đã tích hợp Redux:

### 1. HomeScreen (`home_screens/HomeScreen.js`)
- Hiển thị danh sách sản phẩm từ Redux store
- Thêm sản phẩm vào giỏ hàng
- Navigate đến chi tiết sản phẩm

### 2. CartScreen (`carts/CartScreen.js`)
- Hiển thị giỏ hàng từ Redux store
- Cập nhật số lượng sản phẩm
- Xóa sản phẩm khỏi giỏ hàng
- Xóa toàn bộ giỏ hàng
- Hiển thị tổng tiền

### 3. ProductManagement (`products/ProductManagement.js`)
- CRUD đầy đủ cho sản phẩm
- Thêm/Sửa/Xóa sản phẩm
- Hiển thị danh sách sản phẩm quản lý

### 4. DetailProduct (`products/DetailProduct.js`)
- Hiển thị chi tiết sản phẩm
- Thêm vào giỏ hàng

## API Endpoints (JSON Server):

- `GET /products` - Lấy danh sách sản phẩm
- `POST /products` - Thêm sản phẩm mới
- `PUT /products/:id` - Cập nhật sản phẩm
- `DELETE /products/:id` - Xóa sản phẩm

## Dependencies chính:

- `@reduxjs/toolkit`: Quản lý Redux state
- `react-redux`: Kết nối React với Redux
- `axios`: HTTP client cho API calls
- `@react-navigation/native`: Navigation
- `@react-navigation/bottom-tabs`: Bottom tab navigation
- `@react-navigation/native-stack`: Stack navigation
- `json-server`: Mock API server

## Lưu ý:

1. **IP Address**: Cần cập nhật IP address trong `productAction.js` để kết nối với JSON server
2. **Mock Data**: Nếu không có kết nối API, app sẽ sử dụng mock data
3. **Error Handling**: Đã tích hợp xử lý lỗi cơ bản
4. **Persistence**: Cart state sẽ bị mất khi restart app (có thể tích hợp AsyncStorage sau)

Ứng dụng đã được tích hợp đầy đủ Redux cho việc quản lý sản phẩm và giỏ hàng với đầy đủ các chức năng CRUD!
