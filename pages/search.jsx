import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { RiLoader4Line } from 'react-icons/ri';

import api from '../utils/api';

import PetCard from '../components/PetCard';
import Options from '../components/base/Options';
import Input from '../components/base/Input';
import Button from '../components/base/Button';
import removeEmpty from '../utils/removeEmpty';

export default function Search() {
  const [petResults, setPetResults] = useState([]);
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState({
    maxh: '',
    minh: '',
    maxw: '',
    minw: '',
    name: '',
  });
  const [preconfirmedFilter, setPreconfirmedFilter] = useState({
    maxh: '',
    minh: '',
    maxw: '',
    minw: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);

  const { query, push } = useRouter();
  let { animal, relationship } = query;
  if (relationship === 'any' || !relationship) {
    relationship = 'adopt or foster';
  }
  if (animal === 'any' || !animal) {
    animal = 'pet';
  }

  const updateResults = async (queryParams) => {
    const urlParams = new URLSearchParams();
    Object.keys(queryParams).forEach((key) => {
      urlParams.append(key, queryParams[key]);
    });
    const { res, error } = await api.search(`?${urlParams.toString()}`);
    if (!error) {
      setPetResults(res);
      setPets(res.docs);
    } else {
      console.error(error);
    }
  };

  const nextPage = async () => {
    if (loading || petResults.hasNextPage === false) {
      return;
    }
    setLoading(true);
    const urlParams = new URLSearchParams();
    if (query) {
      Object.keys(query).forEach((key) => {
        urlParams.append(key, query[key]);
      });
    }
    urlParams.append('page', petResults.nextPage);
    console.log(urlParams);
    const { res, error } = await api.search(`?${urlParams.toString()}`);
    console.log(res);
    if (!error) {
      setPetResults(res);
      setPets([...pets, ...res.docs]);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  const updateQuery = () => {
    const filteredQuery = removeEmpty({ ...query, ...filter });
    push({
      pathname: '/search',
      query: filteredQuery,
    });
  };

  const handlePreconfirm = (edited) => {
    setPreconfirmedFilter({ ...preconfirmedFilter, ...edited });
  };

  const handleConfirm = (keys, reset = false) => {
    const confirmed = Object.fromEntries(keys.map((key) => [key, preconfirmedFilter[key]]));
    const confirmedReset = Object.fromEntries(keys.map((key) => [key, '']));
    if (!reset) {
      setFilter({
        ...filter,
        ...confirmed,
      });
    } else {
      setPreconfirmedFilter({ ...preconfirmedFilter, ...confirmedReset });
      setFilter({ ...filter, ...confirmedReset });
    }
  };

  useEffect(() => {
    updateResults(query);
  }, [query]);

  useEffect(() => {
    updateQuery(filter);
  }, [filter]);

  return (
    <>
      <Head>
        <title>SPCA - Search</title>
      </Head>
      <div className="container-max">
        {petResults && (
          <h5
            className={petResults.totalDocs > 0 ? '' : 'invisible'}
          >{`${petResults.totalDocs} pets`}</h5>
        )}
        <h1 className="text-3xl">
          <span className="capitalize">{`${animal}s to ${relationship}`}</span>
        </h1>
        <section className="mt-6">
          <div className="mt-6 flex">
            <Options
              compact
              label="Name"
              confirm={() => handleConfirm(['name'])}
              reset={() => {
                handleConfirm(['name'], true);
              }}
              value="Name"
              className={`w-24 mr-4 text-center ${filter.name && 'border-black'}`}
            >
              <div className="w-72 p-4">
                <h3 className="text-xl pb-3">Pet name</h3>
                <div className="flex">
                  <Input
                    type="text"
                    value={preconfirmedFilter.name}
                    placeholder="Name"
                    name="name"
                    onChange={handlePreconfirm}
                  />
                </div>
              </div>
            </Options>
            <Options
              compact
              label="Weight"
              confirm={() => {
                handleConfirm(['maxw', 'minw']);
              }}
              reset={() => {
                handleConfirm(['maxw', 'minw'], true);
              }}
              value="Weight"
              className={`w-24 mr-4 text-center ${(filter.maxw || filter.minw) && 'border-black'}`}
            >
              <div className="w-72 p-4">
                <h3 className="text-xl pb-3">Weight range (kg)</h3>
                <div className="flex">
                  <Input
                    type="number"
                    value={preconfirmedFilter.minw}
                    placeholder="Min"
                    name="minw"
                    onChange={handlePreconfirm}
                  />
                  <div className="w-6" />
                  <Input
                    type="number"
                    value={preconfirmedFilter.maxw}
                    placeholder="Max"
                    name="maxw"
                    onChange={handlePreconfirm}
                  />
                </div>
              </div>
            </Options>
            <Options
              compact
              label="Height"
              confirm={() => {
                handleConfirm(['maxh', 'minh']);
              }}
              reset={() => {
                handleConfirm(['maxh', 'minh'], true);
              }}
              value="Height"
              className={`w-24 mr-4 text-center ${(filter.maxh || filter.minh) && 'border-black'}`}
            >
              <div className="w-72 p-4">
                <h3 className="text-xl pb-3">Height range (cm)</h3>
                <div className="flex">
                  <Input
                    type="number"
                    value={preconfirmedFilter.minh}
                    placeholder="Min"
                    name="minh"
                    onChange={handlePreconfirm}
                  />
                  <div className="w-6" />
                  <Input
                    type="number"
                    value={preconfirmedFilter.maxh}
                    placeholder="Max"
                    name="maxh"
                    onChange={handlePreconfirm}
                  />
                </div>
              </div>
            </Options>
          </div>
        </section>
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets?.map((pet) => (
            <PetCard key={`saved-${pet._id}`} pet={pet} />
          ))}
        </section>
        <div className="flex flex-col items-center m-4">
          {pets?.length === 0 && <div>No Pets Found</div>}
          {petResults.hasNextPage && !loading && <Button onClick={nextPage}>Load more</Button>}
          <RiLoader4Line className={`text-2xl animate-spin ${loading ? '' : 'hidden'}`} />
        </div>
      </div>
    </>
  );
}
