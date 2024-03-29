import * as service from "../services/productServices.js";
import { HttpResponse } from "../utils/http.response.js"
const httpResponse = new HttpResponse();
import error from "../utils/errors.dictionary.js";


export const getproduct = async (req, res, next) => {
  try {
    const { page, limit, sort, filter, filterValue } = req.query;
    const response = await service.getProductsService(
      page,
      limit,
      sort,
      filter,
      filterValue
    );

    if (!response) {
      return httpResponse.NotFound(res, error.PRODUCT_NOT_CREATED)
    } else {


      const nextPage = response.hasNextPage
        ? `http://localhost:8080/api/products?page=${response.nextPage}`
        : null;
      const prevPage = response.hasPrevPage
        ? `http://localhost:8080/api/products?page=${response.prevPage}`
        : null;
      const existHasPrevPage = response.hasPrevPage ? true : false;
      const existHasNextPage = response.hasNextPage ? true : false;
      const existPrevLink = prevPage ? true : false;
      const existNextLink = nextPage ? true : false;


      return httpResponse.Ok(res, {
        payload: response.docs,
        totalPages: response.totalPages,
        prevPage: existPrevLink,
        nextPage: existNextLink,
        page: response.page,
        hasPrevPage: existHasPrevPage,
        hasNextPage: existHasNextPage,
        prevLink: prevPage,
        nextLink: nextPage
      })
    }
  } catch (error) {
    next(error.message);
  }
};

export const getproductPaginate = async (req, res, next) => {
  try {
    const { page, limit, sort, filter, filterValue } = req.query;
    const response = await service.getProductsService(
      page,
      limit,
      sort,
      filter,
      filterValue
    );
    const nextPage = response.hasNextPage
      ? `http://localhost:8080/products?page=${response.nextPage}`
      : null;
    const prevPage = response.hasPrevPage
      ? `http://localhost:8080/products?page=${response.prevPage}`
      : null;
    const existHasPrevPage = response.hasPrevPage ? true : false;
    const existHasNextPage = response.hasNextPage ? true : false;

    const userPrev = req.user

    const user = userPrev.toObject();

    const products = response.docs;

    const productsMap = products.map((product) => product.toObject());

    res.status(200).render("products", {
      productsMap,
      hasPrevPage: existHasPrevPage,
      hasNextPage: existHasNextPage,
      nextPage,
      prevPage,
      limit,
      page,
      totalPages: response.totalPages,
      products,
      user
    }

    );

  } catch (error) {
    next(error.message);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getProductByIdService(id);
    if (!product) return httpResponse.NotFound(res, error.PRODUCT_NOT_FOUND)
    else return httpResponse.Ok(res, { product })
  } catch (error) {
    next(error.message);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const user = req.user

    const response = await service.addProductService(product, user)

    if (!product) return httpResponse.NotFound(res, error.PRODUCT_INVALID)
    else return httpResponse.Ok(res, { 'Created product': response })
  } catch (error) {
    next(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const user = req.user

    const productUpdated = await service.updateProductService(id, product, user);

    if (!productUpdated) return httpResponse.NotFound(res, error.PRODUCT_NOT_UPDATED)

    else return httpResponse.Ok(res, { 'Updated product': productUpdated })

  } catch (error) {
    next(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user

    const deletedProd = await service.deleteProductService(id, user);


    if (!deletedProd) return httpResponse.NotFound(res, error.PRODUCT_NOT_DELETED)

    else return httpResponse.Ok(res, { deletedProd })

  } catch (error) {
    next(error.message);
  }
};



// -------  DTO  ----- // 


export const getByIdDTO = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getByIdDTOService(id);

    if (!product) return httpResponse.NotFound(res, error.PRODUCT_NOT_FOUND)

    else return httpResponse.Ok(res, { product })
  } catch (error) {
    next(error.message);
  }
};


export const createProdDTO = async (req, res, next) => {
  try {
    const product = await service.createProdDTOService(req.body);
    if (!product) return httpResponse.NotFound(res, error.PRODUCT_NOT_CREATED);
    else return httpResponse.Ok(res, { product })
  } catch (error) {
    next(error.message);
  }
};


// MOCKS //


export const createProductsMocks = async (req, res, next) => {
  try {
    const { cant } = req.query;
    const response = await service.createProductsMockService(cant)
    if (!response) return httpResponse.NotFound(res, error.PRODUCT_NOT_FOUND)
    else return httpResponse.Ok(res, { 'Mock Products': response })
  } catch (error) {
    next(error.message);
  }
};

export const getProductsMocks = async (req, res, next) => {
  try {
    const response = await service.getProductsMocksService()
    if (!response) return httpResponse.NotFound(res, error.PRODUCT_NOT_FOUND)
    else return httpResponse.Ok(res, response)
  } catch (error) {
    next(error.message);
  }
};




