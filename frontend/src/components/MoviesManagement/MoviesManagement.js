import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import '../../styles/MoviesTable.css';

const MoviesTable = () => {

    let emptyMovie = {
        _id: '',
        title: '',
        year: 2022,
        director: '',
        genres: [''],
        description: '',
        poster: '',
        length: '0h00m',
        stars: ''
    };

    const [movies, setMovies] = useState(null);
    const [movieDialog, setMovieDialog] = useState(false);
    const [deleteMovieDialog, setDeleteMovieDialog] = useState(false);
    const [movie, setMovie] = useState(emptyMovie);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [genres, setGenres] = useState([]);
    const [movieChange, setMovieChange] = useState(0);
    const toast = useRef(null);
    const dt = useRef(null);


    const axiosPrivate = useAxiosPrivate();

    useEffect(async () => {
        await axiosPrivate.get('http://localhost:3000/movies')
            .then(response => response.data)
            .then(data => setMovies(data));
    }, [movieChange]);


    const openNew = () => {
        setMovie(emptyMovie);
        setSubmitted(false);
        setMovieDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setMovieDialog(false);
    }

    const hideDeleteMovieDialog = () => {
        setDeleteMovieDialog(false);
    }

    const saveMovie = async () => {
        setSubmitted(true);

        let _movies = [...movies];
        let _movie = { ...movie };

        _movie['stars'] = _movie['stars'] == '' ? '' : _movie['stars'].split(', ')

        await axiosPrivate.post('http://localhost:3000/movies/new', _movie, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // check for error response
                if (response.statusText != 'Created') {
                    const data = response.data
                    // get error message from body or default to response status
                    const errorMessage = (data && data.statusText) || response.status;
                    return Promise.reject(errorMessage);
                }
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Movie Saved', life: 3000 });
            })
            .catch(error => {
                console.error(error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: `Could not saved movie! ${error.toString()}`, life: 3000 });
            });

        setMovies(_movies);
        setMovieDialog(false);
        setMovie(emptyMovie);
        setGenres([]);
        setMovieChange(movieChange + 1);
    }

    const deleteMovie = async () => {

        await axiosPrivate.delete(`http://localhost:3000/movies/${movie._id}`)
            .then(response => {
                // check for error response
                if (response.statusText != 'OK') {
                    const data = response.data
                    // get error message from body or default to response status
                    const errorMessage = (data && data.statusText) || response.status;
                    return Promise.reject(errorMessage);
                }
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Movie Deleted', life: 3000 });
            })
            .catch(error => {
                console.error(error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: `Could not delete movie! ${error.toString()}`, life: 3000 });
            });
        const _movies = movies.filter(val => val.id !== movie._id);

        setDeleteMovieDialog(false);
        setMovies(_movies);
        setMovie(emptyMovie);
        setMovieChange(movieChange - 1)
    }

    const onGenreChange = (e) => {
        let selectedGenres = [...genres];
        if (e.checked)
            selectedGenres.push(e.value);
        else
            selectedGenres.splice(selectedGenres.indexOf(e.value), 1);
        let _movie = { ...movie };
        _movie['genres'] = selectedGenres;
        setGenres(selectedGenres);
        setMovie(_movie);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _movie = { ...movie };
        _movie[`${name}`] = val;

        setMovie(_movie);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _movie = { ...movie };
        _movie[`${name}`] = val;

        setMovie(_movie);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
            </React.Fragment>
        )
    }

    const confirmDeleteMovie = (movie) => {
        setMovie(movie);
        setDeleteMovieDialog(true);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteMovie(rowData)} />
            </React.Fragment>
        );
    }

    const showInfoBodyTemplate = (movie) => {
        return (
            <Link to={`/movie/${movie._id}`}>
                <Button icon="pi pi-search" className="p-button-rounded p-button-info" onClick={() => useNavigate(`/movie/${movie._id}`)} />
            </Link>
        );
    }

    const posterBodyTemplate = (movie) => {
        return <img src={`${movie.poster}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={movie.title} className="poster" />
    }

    const header = (
        <div className="table-header">
            <h5 className="table-title">MOVIES IN THE COLLECTION</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const movieDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveMovie} />
        </React.Fragment>
    );
    const deleteMovieDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteMovieDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteMovie} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={movies} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} movies"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll" rowKey={movie._id}>

                    <Column body={showInfoBodyTemplate} exportable={false}></Column>
                    <Column field="title" header="Title" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="year" header="Year" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="director" header="Director" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="poster" header="Poster" body={posterBodyTemplate}></Column>
                    <Column field="length" header="Length" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column header="" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={movieDialog} style={{ width: '450px' }} header="Movies Details" modal className="p-fluid" footer={movieDialogFooter} onHide={hideDialog}>
                {movie.image && <img src={`images/product/${movie.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={movie.image} className="poster block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="title">Title</label>
                    <InputText id="title" value={movie.title} onChange={(e) => onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.title })} />
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={movie.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3">Genres</label>
                    <div className="genres-grid">
                        <div>
                            <Checkbox inputId="genre1" name="genres" value="Drama" onChange={onGenreChange} checked={genres.includes('Drama')} />
                            <label htmlFor="genre1" className="p-checkbox-label">Drama</label>
                        </div>
                        <div>
                            <Checkbox inputId="genre2" name="genres" value="Comedy" onChange={onGenreChange} checked={genres.includes('Comedy')} />
                            <label htmlFor="genre2" className="p-checkbox-label">Comedy</label>
                        </div>
                        <div>
                            <Checkbox inputId="genre3" name="genres" value="Action" onChange={onGenreChange} checked={genres.includes('Action')} />
                            <label htmlFor="genre3" className="p-checkbox-label">Action</label>
                        </div>
                        <div>
                            <Checkbox inputId="genre4" name="genres" value="Animation" onChange={onGenreChange} checked={genres.includes('Animation')} />
                            <label htmlFor="genre4" className="p-checkbox-label">Animation</label>
                        </div>
                        <div>
                            <Checkbox inputId="genre5" name="genres" value="Fantasy" onChange={onGenreChange} checked={genres.includes('Fantasy')} />
                            <label htmlFor="genre5" className="p-checkbox-label">Fantasy</label>
                        </div>
                        <div>
                            <Checkbox inputId="genre6" name="genres" value="Adventure" onChange={onGenreChange} checked={genres.includes('Adventure')} />
                            <label htmlFor="genre6" className="p-checkbox-label">Adventure</label>
                        </div>
                        <div>
                            <Checkbox inputId="genre7" name="genres" value="Crime" onChange={onGenreChange} checked={genres.includes('Crime')} />
                            <label htmlFor="genre7" className="p-checkbox-label">Crime</label>
                        </div>
                        <div>
                            <Checkbox inputId="genre8" name="genres" value="Romance" onChange={onGenreChange} checked={genres.includes('Romance')} />
                            <label htmlFor="genre8" className="p-checkbox-label">Romance</label>
                        </div>
                        <div>
                            <Checkbox inputId="genre9" name="genres" value="History" onChange={onGenreChange} checked={genres.includes('History')} />
                            <label htmlFor="genre9" className="p-checkbox-label">History</label>
                        </div>
                        <div>
                            <Checkbox inputId="genre10" name="genres" value="Biography" onChange={onGenreChange} checked={genres.includes('Biography')} />
                            <label htmlFor="genre10" className="p-checkbox-label">Biography</label>
                        </div>
                        <div>
                            <Checkbox inputId="genre11" name="genres" value="Musical" onChange={onGenreChange} checked={genres.includes('Musical')} />
                            <label htmlFor="genre11" className="p-checkbox-label">Musical</label>
                        </div>
                        <div>
                            <Checkbox inputId="genre12" name="genres" value="Sci-Fi" onChange={onGenreChange} checked={genres.includes('Sci-Fi')} />
                            <label htmlFor="genre12" className="p-checkbox-label">Sci-Fi</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="director">Director</label>
                        <InputText id="director" value={movie.director} onChange={(e) => onInputChange(e, 'director')} />
                    </div>
                    <div className="field col">
                        <label htmlFor="stars">Stars</label>
                        <InputTextarea id="stars" value={movie.stars} onChange={(e) => onInputChange(e, 'stars')} />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="year">Year</label>
                        <InputNumber id="year" value={movie.year} onValueChange={(e) => onInputNumberChange(e, 'year')} integeronly />
                    </div>
                    <div className="field col">
                        <label htmlFor="length">Length</label>
                        <InputText id="length" value={movie.length} onChange={(e) => onInputChange(e, 'length')} />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="poster">Link to poster</label>
                        <InputText id="poster" value={movie.poster} onChange={(e) => onInputChange(e, 'poster')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteMovieDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteMovieDialogFooter} onHide={hideDeleteMovieDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {movie && <span>Are you sure you want to delete <b>{movie.name}</b>?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default MoviesTable;
