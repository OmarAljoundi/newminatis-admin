import { Small } from 'components/Typography'
import { FC } from 'react'
import { Link } from 'react-router-dom'

// ==============================================================
type NavLinkProps = {
    title: string
    url?: string
    color?: string
    borderColor?: string
}
// ==============================================================

const NavLink2: FC<NavLinkProps> = ({
    url,
    title = 'SHOP NOW',
    color,
    borderColor = 'primary.600',
}) => {
    return url ? (
        <Link to={url}>
            <a>
                <Small
                    fontWeight="900"
                    borderBottom={2}
                    color={color}
                    borderColor={borderColor}
                >
                    {title}
                </Small>
            </a>
        </Link>
    ) : (
        <Small
            fontWeight="900"
            borderBottom={2}
            color={color}
            borderColor={borderColor}
        >
            {title}
        </Small>
    )
}

export default NavLink2
