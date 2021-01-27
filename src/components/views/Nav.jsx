import React, {useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles/Nav.css'

import { useLocation } from 'react-router-dom'

const last = arr => arr[arr.length - 1]

const styles = {
    position: 'sticky',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'blueviolet',
    top: 0, 
    marginBottom: 20
}

export const NavBar = () => (
    <nav style={styles}>
        <Link to="/"><h2>Home</h2></Link>
        <Link to="/campuses"><h2>Campuses</h2></Link>
        <Link to="/students"><h2>Students</h2></Link>
    </nav>
)


const ActionBar = ({ buttons=[] }) => (<footer style={{ position: 'sticky', color: 'black', bottom: 0, left:0, display: 'flex', backgroundColor: 'blueviolet', marginTop: 20  }}>
    { buttons?.map(([ button, handler ]) => (<h2 style={{ flex: 1, flexBasis: '50%' }} onClick={handler}>{button}</h2>)) }
</footer>)

export const withComboBar = Comp => ({ location }) => {
    const { pathname } = useLocation()
    //const [ isSingle, setSingle ] = useState(!Number.isNaN(Number(pathname.split('/')[pathname.split('/').length - 1])))
    const [ isEditing, setEditing ] = useState(false)
    const [ isDeleting, setDeleting ] = useState(false)
    const [ isConfirmed, setConfirmed ] = useState(false)

    const formRef = useRef()

    const isSingle = !(Number.isNaN(Number(last(pathname.split('/')))) || last(pathname.split('/')) === "")
    const isActionable = (pathname.includes('/campuses') || pathname.includes('/students'))
    const reset = () => {
        setEditing(false)
        setDeleting(false)
        setConfirmed(false)
    } 

    //useEffect(() => console.log("NavBar location ", pathname, " home: ", isHome), [pathname])
    useEffect(() => {
       reset()
       //console.log("single: ", pathname.split('/'))
        //setSingle(!Number.isNaN(Number(pathname.split('/')[pathname.length - 1])))
    }, [ pathname ])

    useEffect(() => { 
        console.log("formRef ", formRef.current)
        if (isConfirmed && (formRef.current?.checkValidity ?? false)) {
            console.log('Confirmed...') 
            if (!formRef.current.checkValidity()) {
                formRef.current.reportValidity()
                setConfirmed(false)
            } else formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }))
            
            
        }
    }, [ formRef.current, isConfirmed ])

    const buttonPairs = [
        [
            [
                ["ADD", () => setEditing(true)]
            ],
            [
                ["CONFIRM", () => setConfirmed(true)],
                ["CANCEL", () => {setEditing(false); setConfirmed(false)}]
            ]
        ],
        [
            [
                [ "EDIT", () => setEditing(true) ], 
                [ "DELETE", () => setDeleting(true) ]
            ],
            [ 
                [ "CANCEL", () => setEditing(false) ], 
                [ "SAVE", () => setConfirmed(true) ] 
            ], 
            [ 
                [ "CONFIRM", () => setConfirmed(true) ], 
                [ "CANCEL", () => setDeleting(false) ] 
            ]
        ]
    ]

    return (<>
            <NavBar />
            <Comp location={location} reset={reset} isEditing={isEditing} isDeleting={isDeleting} isConfirmed={isConfirmed} isSingle={isSingle} pathname={pathname} formRef={ref => { formRef.current = ref }} />
   
            {isActionable && <ActionBar buttons={!isSingle ? buttonPairs[0][ !isEditing ? 0 : 1 ] : buttonPairs[1][ !isEditing ? isDeleting ? 2 : 0 : 1 ]}/> }

 </>)
}