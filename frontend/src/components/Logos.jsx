import React from 'react'
import { MdCastForEducation } from "react-icons/md"
import { SiOpenaccess } from "react-icons/si"
import { FaSackDollar } from "react-icons/fa6"
import { BiSupport } from "react-icons/bi"
import { FaUsers } from "react-icons/fa"

const ITEMS = [
  { Icon: MdCastForEducation, label: '20k+ Online Courses', color: '#7c6af7' },
  { Icon: SiOpenaccess, label: 'Lifetime Access', color: '#06d6a0' },
  { Icon: FaSackDollar, label: 'Value For Money', color: '#f59e0b' },
  { Icon: BiSupport, label: 'Lifetime Support', color: '#3b82f6' },
  { Icon: FaUsers, label: 'Community Support', color: '#ec4899' },
]

function Logos() {
  return (
    <div style={{
      background: 'var(--color-surface-2)',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
      padding: '24px',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexWrap: 'wrap', gap: 12, maxWidth: 900, margin: '0 auto'
      }}>
        {ITEMS.map(({ Icon, label, color }, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            background: `${color}0d`,
            border: `1px solid ${color}22`,
            transition: 'all 0.2s',
            cursor: 'default'
          }}
            onMouseEnter={e => { e.currentTarget.style.background = `${color}1a`; e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = `${color}0d`; e.currentTarget.style.borderColor = `${color}22`; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <Icon style={{ width: 22, height: 22, color }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Logos
