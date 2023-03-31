import React from 'react'
import { StyledContacts } from './styled'
import icons from './helpers'

export default function ContactUs() {
  return (
    <StyledContacts.Container>
      <StyledContacts.Title>
        Как связаться с нами?
      </StyledContacts.Title>
     <StyledContacts.Content>
     Основатели Blvck Paris – это интересный пример того, как крошечный бизнес с ультра-бережливым бюджетом может добиться успеха в такой конкурентной индустрии, как мода. Владельцы бренда живут на разных континентах - О'Хайон, родом из Франции и сейчас живет в Бельгии, а Джонстон – в Австралии, и они каждый день общаются по видеосвязи.
     </StyledContacts.Content>
     <StyledContacts.IconsWrapper >
       {icons.map((icon,idx)=> (
        <StyledContacts.Icon key={idx}>
            <StyledContacts.IconLink href={icon.href} target='_blank'>
                {icon.as}
            </StyledContacts.IconLink>
        </StyledContacts.Icon>
       ))}

     </StyledContacts.IconsWrapper>
    </StyledContacts.Container>
  )
  
}

