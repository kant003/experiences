import { addExperience, updateExperience, getUserRef } from "../services/experiencesFirestore";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import s1 from '../assets/images/s1.png'; // Tell webpack this JS file uses this image
import s2 from '../assets/images/s2.png'; // Tell webpack this JS file uses this image
import s3 from '../assets/images/s3.png'; // Tell webpack this JS file uses this image
import s4 from '../assets/images/s4.png'; // Tell webpack this JS file uses this image
import s5 from '../assets/images/s5.png'; // Tell webpack this JS file uses this image
import s6 from '../assets/images/s6.png'; // Tell webpack this JS file uses this image
import { notify, notifyError } from '../services/Utils';


// https://react-hook-form.com/get-started
// podemos usar yup para la validación
// TOD: poner los tags en un componente aparte

export default function Form({ id, experience }) {
    const defaultValues= {
        title: experience &&experience.title ,
     }

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm(
        
    );

    const [tags, setTags] = useState(['huesos', 'piel']);

    const [systemImg, setSystemImg] = useState(s1);
    const [systemName, setSystemName] = useState(s1);
    const [area, setArea] = useState(null);

    const [text, setText] = useState('');

    useEffect(() => {
        if (experience) {
            setValue('title', experience.title);
            setValue('text', experience.text);
            setValue('tags', experience.tags);
            setValue('aceptConditions', experience.aceptConditions);
            setValue('type', experience.type);
            setValue('createdAt', experience.createdAt);
            setValue('userRef', experience.userRef);
            setValue('area', experience.area);
            setValue('system', experience.system);
        }
    }, [experience]);

    /*useEffect(() => {
        if (experience) {
            setValue([
                { title: experience.title }, 
            ]);
        }
    }, [experience]);*/

    const onSubmit = async data => {
        data.tags = tags
        const authUser = await JSON.parse(localStorage.getItem('authUser'))
        data.userRef = getUserRef(authUser.uid)
        data.systemImg = systemImg
        data.systemName = systemName
        data.area = area
        try {
            if (id) await updateExperience(id, data)
            else await addExperience(data)
            notify('Experiencia añadida correctamente')
        } catch (error) {
            notifyError('Error al dejar de seguir: ' + error)
        }

        reset();
    }

    //console.log(watch("example")); // watch input value by passing the name of it

    const removeTag = (tag) => setTags(tags.filter(t => t !== tag))

    const listTags = tags.map((tag) =>
        <div key={tag} className="control">

            <div className="tags has-addons">
                <span className="tag is-success"> {tag}
                    <button className="delete is-small" onClick={() => removeTag(tag)}>x</button>
                </span>
            </div>
        </div>
    );


    const addTagList = e => {
        e.preventDefault(); 

        const myUniqueArray = [...new Set([...tags,text])]; // myArray = [...new Set(myArray)];
        setText('')
        setTags(myUniqueArray)
    }

    const formTag =
    <div>
            <label>
                <input value={text} placeholder="nombre del tag" onChange={(e) => setText(e.target.value)} />
            </label>
            <input type="submit" value="Añade" onClick={ e => addTagList(e) }/>
        </div>



    const onSystemChange = e => {
        e.preventDefault();
        console.log('aa', e.target.value)
        switch (e.target.value) {
            case 's1': setSystemImg(s1); setSystemName('Aparato cirtulatorio'); break;
            case 's2': setSystemImg(s2); setSystemName('Sistema nervioso'); break;
            case 's3': setSystemImg(s3); setSystemName('Sistema esquelético'); break;
            case 's4': setSystemImg(s4); setSystemName('Aparato respiratorio'); break;
            case 's5': setSystemImg(s5); setSystemName('Sistema digestivo'); break;
            case 's6': setSystemImg(s6); setSystemName('Sistema muscular'); break;
            default: setSystemImg(s1); setSystemName('Aparato cirtulatorio'); break
        }
    }

    const onAreaChange = (e, s) => {
        e.preventDefault();
        console.log('aaaa', e.target.value, s)
        switch (s) {
            case 'c': setArea('cabeza'); break;
            case 'es': setArea('extremidades superiores'); break;
            case 'ts': setArea('tronco superior'); break;
            case 'tm': setArea('tronco medio'); break;
            case 'ti': setArea('tronco inferior'); break;
            case 'ei': setArea('extremidades inferior'); break;
            default: setArea('otro');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {experience && experience.title}
            {/* register your input into the hook by invoking the "register" function */}
            <div className="field">
                <label className="label">Titulo</label>
                <div className="control">
                    <input {...register("title", { required: true })} className="input" name="title" placeholder="Pon un título a tu experiencia" />
                </div>
                {errors.title && <span className="help is-danger">Titulo obligatorio</span>}
            </div>

            <div className="field">
                <label className="label">Tipo de operación</label>
                <div className="control">
                    <div className="select">
                        <select name="type" {...register("type")} onChange={(e) => onSystemChange(e)}>
                            <option value="s1">Aparato cirtulatorio</option>
                            <option value="s2">Sistema nervioso</option>
                            <option value="s3">Sistema esquelético</option>
                            <option value="s4">Aparato respiratorio</option>
                            <option value="s5">Sistema digestivo</option>
                            <option value="s6">Sistema muscular</option>
                            <option>....</option>
                        </select>
                    </div>
                </div>
            </div>

            <label className="label">Toca en la zona del cuerpo: {area}</label>

            <map name="image-map" >
                <area onClick={(e) => onAreaChange(e, 'c')} alt="cabeza" title="cabeza" href="#" coords="74,18,67,45,81,79,123,80,140,46,135,16,115,5,96,5,86,10" shape="poly" />
                <area onClick={(e) => onAreaChange(e, 'es')} target="_blank" alt="extremidad supA" title="extremidad supA" href="#" coords="71,84,41,100,33,136,30,183,24,244,6,275,23,308,49,294,52,242,64,201,70,132" shape="poly" />
                <area onClick={(e) => onAreaChange(e, 'es')} target="" alt="extremidad supB" title="extremidad supB" href="#" coords="129,84,165,93,179,123,178,145,178,181,182,223,184,250,200,276,193,307,166,297,156,253,147,213,141,172,148,126" shape="poly" />
                <area onClick={(e) => onAreaChange(e, 'ts')} target="" alt="troncoSup" title="troncoSup" href="#" coords="82,81,72,88,68,167,143,170,144,126,124,81" shape="poly" />
                <area onClick={(e) => onAreaChange(e, 'tm')} target="" alt="troncoMed" title="troncoMed" href="#" coords="68,166,137,171,146,217,63,216" shape="poly" />
                <area onClick={(e) => onAreaChange(e, 'ti')} target="" alt="troncoInf" title="troncoInf" href="#" coords="63,219,143,217,155,271,104,283,52,272" shape="poly" />
                <area onClick={(e) => onAreaChange(e, 'ei')} target="" alt="extremidadInfA" title="extremidadInfA" href="#" coords="54,274,66,458,54,483,97,499,102,433,103,287" shape="poly" />
                <area onClick={(e) => onAreaChange(e, 'ei')} target="" alt="extremidadInfB" title="extremidadInfB" href="#" coords="105,284,154,273,136,455,150,485,107,496" shape="poly" />
            </map>
            <img src={systemImg} alt='s1' width="25%" usemap="#image-map" />


            <div className="field">
                <label className="label">Cuéntanos tu experiencia</label>
                <div className="control">
                    <textarea className="textarea" {...register("text")} name="text" placeholder="Textarea"></textarea>
                </div>
            </div>

            <div className="field">
                <label className="label">Aceptas los terminos y condiciones</label>

                <div className="control">
                    <label className="radio">
                        <input type="radio" name="question" {...register("aceptConditions")} />
                        Yes
                    </label>
                    <label className="radio">
                        <input type="radio" name="question" />
                        No
                    </label>
                </div>
            </div>

            <div className="field is-grouped is-grouped-multiline">
                <label className="label">Tags</label>
                {listTags}
                {formTag}
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button type="submit" className="button is-link" >Enviar</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light" onClick={() => reset()} >Cancelar</button>
                </div>
            </div>

        </form>
    )
}
