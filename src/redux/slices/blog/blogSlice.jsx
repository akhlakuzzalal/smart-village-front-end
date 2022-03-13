import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../api/axios';

// create the thunk
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (pagination) => {
    const response = await axios
      .get(
        `/student/allBlogs/?page=${pagination.currPage}&size=${
          pagination.size
        }&search=${pagination.search}&roles=${JSON.stringify([2000])}`
      )
      .then((response) => response.data);
    return {
      blogs: response.blogs,
      count: response.count,
      pageCount: pagination.pageCount,
      size: pagination.size,
      search: pagination.search,
    };
  }
);

// fetch teacher my blogs
export const fetchMyBlogs = createAsyncThunk(
  'blogs/fetchMyBlogs',
  async (email) => {
    const response = await axios.get(`/teacher/myBlogs/?email=${email}`);
    return response.data;
  }
);

export const deleteABlog = createAsyncThunk('blogs/deleteABlog', async (id) => {
  const response = await axios.delete(`/teacher/deleteABlog/?id=${id}`);
  return response?.data?._id;
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    pageCount: 0,
    currPage: 0,
  },
  reducers: {
    setCurrPage: (state, { payload }) => {
      state.currPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, { payload }) => {
      state.blogs = payload.blogs;
      const count = payload.count;
      const pageNumber = Math.ceil(count / payload.size);
      if (payload.search) {
        state.currPage = 0;
      }
      state.pageCount = pageNumber;
    });
    builder.addCase(fetchMyBlogs.fulfilled, (state, { payload }) => {
      state.blogs = payload;
    });
    builder.addCase(deleteABlog.fulfilled, (state, { payload }) => {
      state.blogs = state.blogs.filter((video) => video._id !== payload);
    });
  },
});

export const { setCurrPage } = blogSlice.actions;

export default blogSlice.reducer;
