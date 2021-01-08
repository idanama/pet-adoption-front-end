import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RiCloseLine } from 'react-icons/ri';
import api from '../utils/api';
import PetCard from '../components/PetCard';
import Options from '../components/base/Options';
import Input from '../components/base/Input';
import Button from '../components/base/Button';
import removeEmpty from '../utils/removeEmpty';

export default function Search() {
  const [petResults, setPetResults] = useState([]);
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

  const { query, push } = useRouter();
  let { animal, relationship } = query;
  if (relationship === 'any' || !relationship) {
    relationship = 'adopt or foster';
  }
  if (animal === 'any' || !animal) {
    animal = 'pet';
  }

  const updateResults = async (queryParams) => {
    try {
      const urlParams = new URLSearchParams();
      Object.keys(queryParams).forEach((key) => {
        urlParams.append(key, queryParams[key]);
      });
      const { res } = await api.getPets(`?${urlParams.toString()}`);
      setPetResults(res);
    } catch (e) {
      console.error(e);
    }
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
    console.log(confirmed);
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
      <div className="container-max">
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
          {petResults.map((pet) => (
            <PetCard key={`saved-${pet._id}`} pet={pet} />
          ))}
        </section>
      </div>
    </>
  );
}
