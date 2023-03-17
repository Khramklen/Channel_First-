import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import styles from '../MainPage/MainPage.module.css';
import { getLogout } from '../../store/action/userAC';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import ReactPaginate from 'react-paginate';
import { useRef } from "react";


export default function MainPage() {

  const [isShowTable, setIsShowTable] = useState({ id: 0, status: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(2);
  const [pageCount, setPageCount] = useState(3);
  const currentPage = useRef();


  useEffect(() => {
    currentPage.current = 1;
    getPaginateArticles();
  }, [])

  const getAllarticles = () => {
    fetch(`/main`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    setData(data.data)
  }

  const delarticle = async (id) => {

    await fetch('/main/article', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    });

    getPaginateArticles();
  }

  const logoutHandler = async () => {
    dispatch(getLogout());
    navigate('/')
  }
  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginateArticles();

  }

  function changeLimit() {
    currentPage.current = 1;
    getPaginateArticles()
  }

  async function getPaginateArticles() {

    const data = await fetch(`/main/paginate?page=${currentPage.current}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    const res = await data.json()
    setPageCount(res.pageCount);
    setData(res.result)

  }

  return (
    <Box className={styles.conteiner}>
      {!user.id ? (
        <Box>
          <p> Неверный логин или пароль, для возможности удаления статей необходимо авторизоваться</p>

          <Link className="nav-link" to={'/'}>Повторная авторизация</Link>
        </Box>
      ) : (

        <Link className="nav-link" to={'/'} onClick={logoutHandler}>ВЫЙТИ</Link>

      )}
      {!data?.length && (
        <Box>
          <p>В разделе отсутствуют доступные статьи</p>
        </Box>
      )}
      <Box >
        {data?.map((article) => (
          <Card className={styles.card} key={article.id} sx={{ maxWidth: 800 }}>
            <CardContent className={styles.cardContent} >{article.text}</CardContent>
            <CardActions className={styles.commentContent}>
              <Box className={styles.commentContent}>
                {user.id === article.user_id && (
                  <Button onClick={() => delarticle(article.id)} size="small">УДАЛИТЬ СТАТЬЮ</Button>
                )}
                <Button id={article.id} onClick={() => setIsShowTable({ id: article.id, status: true })} size="small">ПРОСМОТРЕТЬ КОММЕНТАРИИ</Button>
              </Box>
              {article.Comments.map((comment) => (
                <Box className={styles.commentContentText} key={comment.id} >
                  {isShowTable.status && isShowTable.id === article.id && (
                    <Box className={styles.autorCommentAll}>
                      <Box className={styles.autorComment}>
                        <Typography>{comment.User.email}</Typography>
                        <Divider />
                        <Typography>
                          {comment.content}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </CardActions>
          </Card>
        ))}
      </Box>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        forcePage={currentPage.current - 1}
      />
      <TextField placeholder="Limit" onChange={e => setLimit(e.target.value)} />
      <Button onClick={changeLimit}>КОЛИЧЕСТВО СТАТЕЙ НА СТРАНИЦЕ</Button>
    </Box>
  );
}
